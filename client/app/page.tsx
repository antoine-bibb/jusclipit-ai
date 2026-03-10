'use client'

import { useState } from 'react'

import { Dashboard } from '../components/dashboard'
import { LoginCard } from '../components/login-card'

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false)

  if (!authenticated) {
    return <LoginCard onLogin={() => setAuthenticated(true)} />
  }

  return <Dashboard />
}
