'use client'

import { useState } from 'react'

type NavbarProps = {
  userName: string
  creditsRemaining: number
}

export function Navbar({ userName, creditsRemaining }: NavbarProps) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="mb-6 flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="Jus Clip It logo" className="h-10 w-auto" />
        <span className="text-lg font-semibold text-brandRed">Jus Clip It</span>
      </div>
      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm"
        >
          Hello, {userName}
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-56 rounded-lg border border-zinc-700 bg-zinc-900 p-3 shadow-xl">
            <p className="text-sm text-zinc-300">Credits remaining</p>
            <p className="text-2xl font-bold text-brandRed">{creditsRemaining} min</p>
            <p className="mt-2 text-xs text-zinc-400">Clips auto-delete after 30 days.</p>
          </div>
        )}
      </div>
    </nav>
  )
}
