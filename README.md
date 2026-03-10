# Jus Clip It

Jus Clip It is a production-ready SaaS starter that turns long-form videos into viral short-form clips.

## Monorepo Layout

- `client/` — Next.js + React + Tailwind front-end
- `server/` — FastAPI API (auth, uploads, clip orchestration)
- `workers/` — Celery worker for async video jobs
- `ai/` — AI pipelines (transcription, scene/virality scoring)
- `video-processing/` — FFmpeg/OpenCV/MediaPipe reframing + caption burn-in
- `database/` — PostgreSQL schema + seed
- `docs/` — architecture and setup documentation

## Quick Start

### 1) Prerequisites

- Docker + Docker Compose
- Node.js 20+
- Python 3.11+

### 2) Environment

```bash
cp .env.example .env
```

Set `OPENAI_API_KEY` and other required values.

### 3) Start infra services

```bash
docker compose up -d postgres redis minio
```

### 4) Run backend

```bash
cd server
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

### 5) Run worker

```bash
cd workers
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
celery -A worker.celery_app worker -l info
```

### 6) Run frontend

```bash
cd client
npm install
npm run dev
```

App: `http://localhost:3000`  
API docs: `http://localhost:8000/docs`

## SaaS Features Included

- JWT authentication and user accounts
- Subscription tiers + quotas
- S3-compatible object storage support (AWS S3/MinIO)
- Async processing pipeline with Redis + Celery
- AI clip candidate extraction, ranking, vertical reframing, and caption presets
- Dashboard with navbar user menu, credits dropdown, upload workflow, and old clips library
- Automatic clip retention cleanup (clips older than 30 days are removed when clip library endpoints are queried)
- Login experience with visible brand logo and a global branded footer

## License

MIT
