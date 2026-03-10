from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

UPLOAD_ROOT = Path("uploads")


def save_upload(file: UploadFile) -> str:
    UPLOAD_ROOT.mkdir(exist_ok=True)
    ext = Path(file.filename or "video.mp4").suffix or ".mp4"
    path = UPLOAD_ROOT / f"{uuid4()}{ext}"
    with path.open("wb") as output:
        output.write(file.file.read())
    return str(path)
