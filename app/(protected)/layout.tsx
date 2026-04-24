'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { authService, type User } from '@/lib/services/authService'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = authService.getStoredUser()
    if (!stored) { router.replace('/login'); return }
    setUser(stored)
  }, [router])

  function logout() {
    authService.logout()
    router.replace('/login')
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm border-b border-brown-950/8 sticky top-0 z-10">
        <div className="w-full px-6 h-14 flex items-center justify-between">
          <Link href="/notes" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-full bg-rust flex items-center justify-center">
              <Icon icon="ph:pencil-simple-bold" className="text-white text-xs" />
            </div>
            <span className="text-sm font-semibold text-brown-950 tracking-tight">WhatWasIThinking</span>
          </Link>

          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:flex items-center gap-2 text-sm text-brown-950/50">
                <Icon icon="ph:user-circle" className="text-base" />
                {user.name}
              </div>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-sm font-medium text-brown-950/50 hover:text-brown-950 transition-colors"
            >
              <Icon icon="ph:sign-out" className="text-base" />
              <span className="hidden sm:block">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  )
}
