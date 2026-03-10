export function Footer() {
  return (
    <footer className="mt-10 border-t border-zinc-800 pt-6 text-sm text-zinc-400">
      <div className="flex flex-col justify-between gap-3 md:flex-row">
        <p>© {new Date().getFullYear()} Jus Clip It. AI clip generation for creators.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Contact</a>
          <a href="#" className="hover:text-white">Pricing</a>
        </div>
      </div>
    </footer>
  )
}
