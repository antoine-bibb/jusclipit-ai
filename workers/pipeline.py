from ai.pipeline import run_ai_pipeline
from video_processing.reframer import smart_reframe


def process_video_pipeline(video_id: str, source_url: str) -> dict:
    ai_output = run_ai_pipeline(source_url)
    clips = []
    for candidate in ai_output["clip_candidates"]:
        rendered = smart_reframe(
            source_url,
            candidate["start"],
            candidate["end"],
            caption_style=candidate["caption_style"],
        )
        clips.append({**candidate, "rendered_path": rendered})
    return {"video_id": video_id, "clips": clips}
