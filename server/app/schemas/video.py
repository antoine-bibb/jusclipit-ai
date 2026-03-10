from pydantic import BaseModel


class VideoCreate(BaseModel):
    title: str
    source_url: str
    duration_seconds: int | None = None


class CaptionStyle(BaseModel):
    preset: str = "capcut_neon"
    font: str = "Montserrat"
    text_color: str = "#FFFFFF"
    outline_color: str = "#000000"
    outline_thickness: int = 3
    drop_shadow: bool = True
    animation: str = "pop"
    word_highlighting: bool = True
    position: str = "bottom"
    opacity: float = 1.0
    background_box: bool = True


class ClipCreate(BaseModel):
    start_seconds: float
    end_seconds: float
    virality_score: float
    caption_style: CaptionStyle
