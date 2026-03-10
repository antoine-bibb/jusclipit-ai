from datetime import datetime, timezone

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import current_user
from app.core.db import get_db
from app.models.entities import Clip, User, Video
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse
from app.schemas.user import UserProfile
from app.schemas.video import ClipCreate, VideoCreate
from app.services.retention import cleanup_expired_clips
from app.services.security import create_access_token, hash_password, verify_password
from app.services.uploads import save_upload
from app.services.billing import create_checkout_link

router = APIRouter()


@router.post("/auth/register", response_model=TokenResponse)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    if db.scalar(select(User).where(User.email == payload.email)):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
    user = User(email=payload.email, password_hash=hash_password(payload.password), full_name=payload.full_name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return TokenResponse(access_token=create_access_token(str(user.id)))


@router.post("/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == payload.email))
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return TokenResponse(access_token=create_access_token(str(user.id)))


@router.get("/auth/me", response_model=UserProfile)
def me(user: User = Depends(current_user)):
    return UserProfile(
        id=str(user.id),
        email=user.email,
        full_name=user.full_name,
        tier=user.tier,
        quota_minutes=user.quota_minutes,
        used_minutes=user.used_minutes,
        credits_remaining=max(user.quota_minutes - user.used_minutes, 0),
    )


@router.post("/videos")
def create_video(
    payload: VideoCreate,
    user: User = Depends(current_user),
    db: Session = Depends(get_db),
):
    video = Video(user_id=user.id, **payload.model_dump())
    db.add(video)
    db.commit()
    db.refresh(video)
    return video


@router.post("/videos/upload")
def upload_video(
    title: str,
    duration_seconds: int = 0,
    file: UploadFile = File(...),
    user: User = Depends(current_user),
    db: Session = Depends(get_db),
):
    file_url = save_upload(file)
    video = Video(
        user_id=user.id,
        title=title,
        source_url=file_url,
        duration_seconds=duration_seconds,
        status="uploaded",
    )
    db.add(video)
    db.commit()
    db.refresh(video)
    return video


@router.get("/videos")
def list_videos(user: User = Depends(current_user), db: Session = Depends(get_db)):
    return db.scalars(select(Video).where(Video.user_id == user.id).order_by(Video.created_at.desc())).all()


@router.post("/videos/{video_id}/clips")
def create_clip(video_id: str, payload: ClipCreate, user: User = Depends(current_user), db: Session = Depends(get_db)):
    clip = Clip(video_id=video_id, user_id=user.id, **payload.model_dump())
    db.add(clip)
    db.commit()
    db.refresh(clip)
    return clip


@router.get("/clips")
def list_clips(user: User = Depends(current_user), db: Session = Depends(get_db)):
    cleanup_expired_clips(db)
    return db.scalars(select(Clip).where(Clip.user_id == user.id).order_by(Clip.created_at.desc())).all()


@router.get("/clips/library")
def clip_library(user: User = Depends(current_user), db: Session = Depends(get_db)):
    cleanup_expired_clips(db)
    now = datetime.now(timezone.utc)
    clips = db.scalars(select(Clip).where(Clip.user_id == user.id)).all()
    return [
        {
            "id": str(clip.id),
            "video_id": str(clip.video_id),
            "output_url": clip.output_url,
            "virality_score": clip.virality_score,
            "expires_in_days": max(0, 30 - (now - (clip.created_at if clip.created_at.tzinfo else clip.created_at.replace(tzinfo=timezone.utc))).days),
        }
        for clip in clips
    ]


@router.post("/billing/checkout")
def start_checkout(plan: str, user: User = Depends(current_user)):
    try:
        url = create_checkout_link(plan=plan, customer_email=user.email)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    return {"checkout_url": url}
