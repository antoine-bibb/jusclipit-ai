'use client'

import { useState } from 'react'

type LoginCardProps = {
  onLogin: (name: string) => void
}

export function LoginCard({ onLogin }: LoginCardProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [fullName, setFullName] = useState('')

  return (
    <section className="mx-auto mt-12 w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950 p-8">
      <div className="mb-6 flex flex-col items-center">
        <img src="/logo.svg" alt="Jus Clip It logo" className="mb-4 h-14 w-auto" />
        <h1 className="text-2xl font-bold text-brandRed">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
      </div>
      <div className="space-y-3">
        {mode === 'signup' && (
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg bg-zinc-900 p-3"
            placeholder="Full name"
          />
        )}
        <input className="w-full rounded-lg bg-zinc-900 p-3" placeholder="Email" />
        <input className="w-full rounded-lg bg-zinc-900 p-3" type="password" placeholder="Password" />
        <button
          onClick={() => onLogin(fullName || 'User')}
          className="w-full rounded-lg bg-brandRed py-3 font-semibold text-white"
        >
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </div>
      <button
        onClick={() => setMode((m) => (m === 'login' ? 'signup' : 'login'))}
        className="mt-4 text-sm text-zinc-400 underline"
      >
        {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
      </button>
    </section>
  )
}
