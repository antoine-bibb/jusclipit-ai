from typing import Any

from ai.scoring import virality_rank
from ai.transcription import transcribe_with_whisper


def run_ai_pipeline(source_url: str) -> dict[str, Any]:
    transcript = transcribe_with_whisper(source_url)
    ranked = virality_rank(transcript)
    return {
        "transcript": transcript,
        "clip_candidates": [
            {
                "start": item["start"],
                "end": item["end"],
                "virality_score": item["score"],
                "caption_style": {
                    "preset": "capcut_bold",
                    "font": "Montserrat",
                    "text_color": "#FFFFFF",
                    "outline_color": "#000000",
                    "outline_thickness": 4,
                    "drop_shadow": True,
                    "animation": "bounce",
                    "word_highlighting": True,
                    "position": "bottom",
                    "opacity": 1.0,
                    "background_box": True,
                },
            }
            for item in ranked
        ],
    }
