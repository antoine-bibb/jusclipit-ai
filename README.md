# Jus Clip It

Jus Clip It is an AI-powered SaaS platform that automatically converts long-form videos into viral short-form clips.

The platform is designed for creators, podcasters, streamers, and media teams who want to quickly repurpose long content into engaging clips optimized for social media.

---

## Core Features

AI Clip Detection

Automatically identifies engaging moments in long videos using speech analysis, emotional detection, and scene segmentation.

Virality Scoring

Each detected clip is ranked using an AI virality scoring algorithm.

Smart Vertical Reframing

The system dynamically tracks speakers and automatically reframes widescreen video into vertical format optimized for TikTok, Instagram Reels, and YouTube Shorts.

Custom Caption Editor

Users can customize subtitles similar to CapCut with:

- font selection
- text color
- outlines
- borders
- drop shadows
- animations
- word-by-word highlighting
- positioning

AI Transcription

Videos are transcribed using speech recognition to power caption generation and clip detection.

---

## Tech Stack

Frontend

Next.js  
React  
TailwindCSS  

Backend

FastAPI  
Python  

AI Pipeline

Whisper transcription  
OpenCV face tracking  
MediaPipe face detection  
PySceneDetect scene detection  

Video Processing

FFmpeg  

Infrastructure

PostgreSQL  
Redis  
Celery  

---

## Platform Workflow

1 Upload video

2 AI transcribes video

3 AI detects scenes and engagement signals

4 AI generates candidate clips

5 Clips receive virality scores

6 Clips are automatically reframed to vertical format

7 Captions are generated and customizable

8 Clips exported for social media

---

## Future Features

AI hook generation  
Direct social media publishing  
Thumbnail generation  
Team collaboration  
Cloud rendering  
Subscription billing  

---

## Vision

Jus Clip It aims to become the easiest way for creators to turn long-form content into viral short-form clips using AI automation.
