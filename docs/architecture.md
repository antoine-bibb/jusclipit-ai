# Jus Clip It Architecture

## High-Level Flow

1. User uploads video metadata and source into object storage.
2. FastAPI creates a `videos` row and enqueues `workers.process_video`.
3. Celery worker runs AI pipeline:
   - Whisper transcription
   - Scene candidate extraction
   - NLP virality scoring and ranking
4. Video processing module performs smart vertical reframing:
   - MediaPipe face detection
   - OpenCV tracking of active speaker
   - 9:16 crop path and optional split-screen mode
5. FFmpeg renders clips with captions + style preset.
6. Output clips are written to S3-compatible storage and linked in `clips`.

## Scalability Design

- Stateless API pods (horizontal autoscaling)
- Worker autoscaling by queue depth
- Redis for low-latency queue + ephemeral state
- PostgreSQL for durable relational data
- S3/CloudFront compatible media delivery
- Clear API boundaries for future public API productization
