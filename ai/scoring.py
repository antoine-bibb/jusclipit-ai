from typing import Any


KEYWORDS = {"hook": 1.5, "bold": 1.2, "actionable": 1.3, "example": 1.1, "punchline": 1.4}


def virality_rank(transcript: dict[str, Any]) -> list[dict[str, float]]:
    ranked: list[dict[str, float]] = []
    for seg in transcript.get("segments", []):
        text = seg["text"].lower()
        score = 50.0
        for keyword, weight in KEYWORDS.items():
            if keyword in text:
                score += 10 * weight
        ranked.append({"start": seg["start"], "end": seg["end"], "score": min(score, 99.0)})
    return sorted(ranked, key=lambda i: i["score"], reverse=True)
