from datetime import datetime, timedelta, timezone

from sqlalchemy import delete
from sqlalchemy.orm import Session

from app.models.entities import Clip


def cleanup_expired_clips(db: Session, retention_days: int = 30) -> int:
    threshold = datetime.now(timezone.utc) - timedelta(days=retention_days)
    stmt = delete(Clip).where(Clip.created_at < threshold)
    result = db.execute(stmt)
    db.commit()
    return result.rowcount or 0
