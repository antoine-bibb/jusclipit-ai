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

type Tier = {
  id: 'free' | 'pro' | 'scale'
  name: string
  price: string
  details: string
}

const initialClips: Clip[] = [
  { id: '1', title: 'Podcast Hook Segment', virality: 91, expiresInDays: 23 },
  { id: '2', title: 'Interview Mic Drop Moment', virality: 87, expiresInDays: 14 },
]

const tiers: Tier[] = [
  { id: 'free', name: 'Free', price: '$0/mo', details: '60 processing minutes' },
  { id: 'pro', name: 'Pro', price: '$49/mo', details: '600 processing minutes' },
  { id: 'scale', name: 'Scale', price: '$199/mo', details: '3000 processing minutes' },
]

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

type DashboardProps = {
  userName: string
}

export function Dashboard({ userName }: DashboardProps) {
  const [clips, setClips] = useState<Clip[]>(initialClips)
  const [videoTitle, setVideoTitle] = useState('')

  const onUpload = () => {
    if (!videoTitle.trim()) return

    setClips((prev) => [
      {
        id: `clip-${Date.now()}`,
        title: `${videoTitle} (queued)`,
        virality: 75,
        expiresInDays: 30,
      },
      ...prev,
    ])
    setVideoTitle('')
  }

  const startCheckout = async (plan: Tier['id']) => {
    if (plan === 'free') return
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('jusclipit_token') : null
      const res = await fetch(`${API_BASE}/api/billing/checkout?plan=${plan}`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (!res.ok) {
        throw new Error('Checkout failed')
      }
      const data = (await res.json()) as { checkout_url: string }
      window.location.href = data.checkout_url
    } catch (error) {
      console.error(error)
      alert('Unable to start Stripe checkout right now. Please try again.')
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-8">
      <Navbar userName={userName} creditsRemaining={420} />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        {tiers.map((tier) => (
          <article key={tier.id} className="rounded-xl border border-zinc-700 bg-zinc-900 p-5">
            <h3 className="text-xl font-semibold">{tier.name}</h3>
            <p className="mt-1 text-brandRed">{tier.price}</p>
            <p className="mb-4 mt-1 text-sm text-zinc-400">{tier.details}</p>
            <button
              onClick={() => startCheckout(tier.id)}
              disabled={tier.id === 'free'}
              className="w-full rounded-lg border border-brandRed px-4 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            >
              {tier.id === 'free' ? 'Current Plan' : `Buy ${tier.name}`}
            </button>
          </article>
        ))}
      </section>

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
            <li>- Font + color + outline + shadow</li>
            <li>- Word highlighting + animations</li>
            <li>- Position + opacity + background boxes</li>
            <li>- CapCut-like presets</li>
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
