const tiers = [
  { name: 'Free', quota: '60 minutes/month', price: '$0' },
  { name: 'Pro', quota: '600 minutes/month', price: '$49' },
  { name: 'Scale', quota: '3000 minutes/month', price: '$199' },
]

const presets = ['CapCut Neon', 'Kinetic Pop', 'Bold Outline', 'Minimal Clean']

export function Dashboard() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl p-8">
      <header className="mb-8 flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div>
          <h1 className="text-3xl font-bold text-brandRed">Jus Clip It</h1>
          <p className="text-zinc-300">Auto-transcribe, detect viral moments, and export social-ready clips.</p>
        </div>
        <img src="/logo.svg" alt="Jus Clip It Logo (replace with attached brand asset)" className="h-16 w-auto" />
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {tiers.map((tier) => (
          <article key={tier.name} className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
            <h2 className="text-xl font-semibold">{tier.name}</h2>
            <p className="text-brandRed">{tier.price}</p>
            <p className="text-sm text-zinc-400">{tier.quota}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
          <h3 className="mb-4 text-xl font-semibold">AI Processing Pipeline</h3>
          <ul className="list-disc space-y-2 pl-5 text-zinc-300">
            <li>Whisper transcription + timestamp segmentation</li>
            <li>PySceneDetect engaging scene detection</li>
            <li>NLP virality scoring and clip ranking</li>
            <li>MediaPipe + OpenCV smart 9:16 reframing</li>
            <li>FFmpeg export presets for Reels/TikTok/Shorts</li>
          </ul>
        </article>

        <article className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
          <h3 className="mb-4 text-xl font-semibold">Caption Studio</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span>Font Family</span><span className="text-zinc-400">Montserrat</span>
            <span>Text Color</span><span className="text-zinc-400">#FFFFFF</span>
            <span>Outline</span><span className="text-zinc-400">#000 / 3px</span>
            <span>Animation</span><span className="text-zinc-400">Pop + Word Highlight</span>
            <span>Position</span><span className="text-zinc-400">Bottom Safe Area</span>
            <span>Background Box</span><span className="text-zinc-400">Enabled</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {presets.map((preset) => (
              <span key={preset} className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
                {preset}
              </span>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}
