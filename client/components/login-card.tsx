'use client'

type LoginCardProps = {
  onLogin: () => void
}

export function LoginCard({ onLogin }: LoginCardProps) {
  return (
    <section className="mx-auto mt-20 max-w-md rounded-xl border border-zinc-800 bg-zinc-950 p-8">
      <div className="mb-6 flex flex-col items-center">
        <img src="/logo.svg" alt="Jus Clip It logo" className="mb-4 h-14 w-auto" />
        <h1 className="text-2xl font-bold text-brandRed">Welcome Back</h1>
      </div>
      <div className="space-y-3">
        <input className="w-full rounded-lg bg-zinc-900 p-3" placeholder="Email" />
        <input className="w-full rounded-lg bg-zinc-900 p-3" type="password" placeholder="Password" />
        <button onClick={onLogin} className="w-full rounded-lg bg-brandRed py-3 font-semibold text-white">
          Login
        </button>
      </div>
    </section>
  )
}
