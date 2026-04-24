import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-rust flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <span className="font-semibold text-brown-950 text-sm">WhatWasIThinking</span>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/login"
            className="text-sm text-brown-950 opacity-60 hover:opacity-100 transition-opacity"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="bg-brown-950 text-white text-sm px-5 py-2 rounded-full font-medium hover:bg-brown-900 transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-0 -mt-6">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/60 px-4 py-1.5 rounded-full text-sm mb-8 ring-1 ring-brown-950/10">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A0522D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="text-brown-950/60">Your second brain, simplified</span>
        </div>

        {/* Heading */}
        <h1 className="font-serif font-bold text-brown-950 leading-tight mb-6 max-w-2xl"
          style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', lineHeight: 1.1 }}
        >
          Never lose a thought again.
        </h1>

        {/* Subtitle */}
        <p className="text-base text-brown-950/55 max-w-sm mb-10 leading-relaxed">
          A quiet, beautiful place to jot down what you&apos;re thinking &mdash; before you forget.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/register"
            className="bg-brown-950 text-white px-8 py-3.5 rounded-2xl font-medium text-sm hover:bg-brown-900 transition-colors"
          >
            Start writing &mdash; it&apos;s free
          </Link>
          <Link
            href="/login"
            className="text-brown-950/55 text-sm hover:text-brown-950 transition-colors"
          >
            I already have an account
          </Link>
        </div>

        {/* Feature cards preview */}
        {/* <div className="mt-20 w-full max-w-3xl grid grid-cols-3 gap-4 px-4">
          {[
            { title: 'Instant capture', body: 'Write it down before it slips away. No friction, no setup.' },
            { title: 'Always accessible', body: 'Your notes sync and are ready whenever inspiration strikes.' },
            { title: 'Beautifully simple', body: 'No clutter, no distractions. Just you and your thoughts.' },
          ].map(card => (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-5 text-left ring-1 ring-brown-950/8 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-brown-950 mb-1.5">{card.title}</h3>
              <p className="text-xs text-brown-950/50 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div> */}
      </main>
    </div>
  )
}
