'use client'

import { useState } from 'react'

import { Footer } from './footer'
import { Navbar } from './navbar'

type Clip = {
  id: string
  title: string
  virality: number
  expiresInDays: number
}

const initialClips: Clip[] = [
  { id: '1', title: 'Podcast Hook Segment', virality: 91, expiresInDays: 23 },
  { id: '2', title: 'Interview Mic Drop Moment', virality: 87, expiresInDays: 14 },
]

export function Dashboard() {
  const [clips, setClips] = useState(initialClips)
  const [videoTitle, setVideoTitle] = useState('')

  const onUpload = () => {
    if (!videoTitle.trim()) return
    setClips((prev) => [
      {
        id: crypto.randomUUID(),
        title: `${videoTitle} (queued)`,
        virality: 75,
        expiresInDays: 30,
      },
      ...prev,
    ])
    setVideoTitle('')
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-8">
      <Navbar userName="User" creditsRemaining={420} />

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-semibold">Upload Long-form Video</h2>
          <p className="mb-4 text-sm text-zinc-300">Upload podcasts, interviews, and streams for AI clip extraction.</p>
          <div className="space-y-3">
            <input
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 p-3"
              placeholder="Video title"
            />
            <input type="file" accept="video/*" className="w-full rounded-lg bg-zinc-800 p-3" />
            <button onClick={onUpload} className="rounded-lg bg-brandRed px-5 py-3 font-semibold">
              Upload & Process
            </button>
          </div>
        </article>

        <article className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-semibold">Caption Customization</h2>
          <ul className="space-y-2 text-zinc-300">
            <li>• Font + color + outline + shadow</li>
            <li>• Word highlighting + animations</li>
            <li>• Position + opacity + background boxes</li>
            <li>• CapCut-like presets</li>
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-xl border border-zinc-700 bg-zinc-900 p-6">
        <h2 className="mb-4 text-xl font-semibold">Old Clips Library</h2>
        <p className="mb-4 text-sm text-zinc-400">Stored clips automatically expire after 30 days.</p>
        <div className="space-y-3">
          {clips.map((clip) => (
            <div key={clip.id} className="flex items-center justify-between rounded-lg bg-zinc-800 p-3">
              <div>
                <p className="font-medium">{clip.title}</p>
                <p className="text-xs text-zinc-400">Virality: {clip.virality}/100</p>
              </div>
              <p className="text-sm text-brandRed">Expires in {clip.expiresInDays} days</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
