'use client'

import { useState } from 'react'

import { Dashboard } from '../components/dashboard'
import { Footer } from '../components/footer'
import { LoginCard } from '../components/login-card'
import { Navbar } from '../components/navbar'

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false)
  const [userName, setUserName] = useState('User')

  const onAuthSuccess = (name: string) => {
    setUserName(name || 'User')
    setAuthenticated(true)
  }

  if (!authenticated) {
    return (
      <main className="mx-auto min-h-screen max-w-6xl p-8">
        <Navbar userName="Guest" creditsRemaining={0} />
        <LoginCard onLogin={onAuthSuccess} />
        <Footer />
      </main>
    )
  }

  return <Dashboard userName={userName} />
}
