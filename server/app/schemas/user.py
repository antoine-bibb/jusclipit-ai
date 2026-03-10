from pydantic import BaseModel


class UserProfile(BaseModel):
    id: str
    email: str
    full_name: str | None = None
    tier: str
    quota_minutes: int
    used_minutes: int
    credits_remaining: int
