import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ash/80 backdrop-blur-md border-b border-ash-dark">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-ink text-lg tracking-tight hover:text-flame-500 transition-colors">
          <span className="text-xl">🔥</span>
          StreakTracker
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="font-body text-sm px-4 py-2 rounded-lg text-ink-muted hover:text-ink hover:bg-white transition-all"
          >
            Dashboard
          </Link>
          <Link
            href="/history"
            className="font-body text-sm px-4 py-2 rounded-lg text-ink-muted hover:text-ink hover:bg-white transition-all"
          >
            History
          </Link>
        </nav>
      </div>
    </header>
  );
}
