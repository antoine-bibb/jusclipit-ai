from typing import Any


def transcribe_with_whisper(source_url: str) -> dict[str, Any]:
    # Stub for OpenAI Whisper. Replace with API call or local whisper model in production.
    return {
        "source_url": source_url,
        "language": "en",
        "segments": [
            {"start": 0.0, "end": 12.5, "text": "Hook the audience immediately with a bold claim."},
            {"start": 12.5, "end": 25.0, "text": "Then deliver fast actionable insight with examples."},
            {"start": 25.0, "end": 45.0, "text": "End with a punchline and clear call-to-action."},
        ],
    }
