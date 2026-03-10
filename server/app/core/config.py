from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file="../.env", extra="ignore")

    app_name: str = "Jus Clip It API"
    database_url: str
    redis_url: str
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    s3_endpoint_url: str
    s3_access_key: str
    s3_secret_key: str
    s3_bucket: str
    s3_region: str = "us-east-1"
    stripe_secret_key: str = ""
    stripe_success_url: str = "http://localhost:3000/billing/success"
    stripe_cancel_url: str = "http://localhost:3000/billing/cancel"


settings = Settings()
