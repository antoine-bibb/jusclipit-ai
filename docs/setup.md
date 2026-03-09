# Setup Guide

## Local Development

1. Copy env file:
   ```bash
   cp .env.example .env
   ```
2. Launch infra:
   ```bash
   docker compose up -d postgres redis minio
   ```
3. Start API in `server/`.
4. Start Celery worker in `workers/`.
5. Start Next.js in `client/`.

## Production Notes

- Deploy FastAPI and workers as separate services.
- Use managed PostgreSQL/Redis.
- Configure S3 bucket lifecycle rules for source and output assets.
- Add observability with OpenTelemetry + Prometheus.
- Add rate limiting and WAF in front of API.
