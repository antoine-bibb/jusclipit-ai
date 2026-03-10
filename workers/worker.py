import os

from celery import Celery

from pipeline import process_video_pipeline

redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
celery_app = Celery("jusclipit", broker=redis_url, backend=redis_url)


@celery_app.task(name="workers.process_video")
def process_video(video_id: str, source_url: str) -> dict:
    return process_video_pipeline(video_id=video_id, source_url=source_url)
