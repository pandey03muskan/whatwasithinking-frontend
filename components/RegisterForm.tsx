'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import { authService } from '@/lib/services/authService'

export default function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authService.register({ name, email, password })
      router.push('/login')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <div className="w-11 h-11 rounded-full bg-rust flex items-center justify-center mx-auto mb-4">
          <Icon icon="ph:pencil-simple-bold" className="text-white text-xl" />
        </div>
        <h1 className="text-2xl font-bold text-brown-950 tracking-tight">WhatWasIThinking</h1>
        <p className="text-sm text-brown-950/50 mt-1">Your thoughts, organized.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-brown-950/10 p-8">
        <h2 className="text-base font-semibold text-brown-950 mb-6">Create your account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-brown-950/60 mb-1.5 uppercase tracking-wide">
              Name
            </label>
            <div className="relative">
              <Icon icon="ph:user" className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-950/30 text-base" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Your name"
                className="w-full pl-9 pr-3 py-2.5 text-sm text-brown-950 bg-cream/50 border border-brown-950/15 rounded-lg placeholder-brown-950/30 focus:outline-none focus:ring-2 focus:ring-brown-950/20 focus:border-brown-950/40 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-brown-950/60 mb-1.5 uppercase tracking-wide">
              Email
            </label>
            <div className="relative">
              <Icon icon="ph:envelope" className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-950/30 text-base" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2.5 text-sm text-brown-950 bg-cream/50 border border-brown-950/15 rounded-lg placeholder-brown-950/30 focus:outline-none focus:ring-2 focus:ring-brown-950/20 focus:border-brown-950/40 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-brown-950/60 mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <Icon icon="ph:lock-simple" className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-950/30 text-base" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="w-full pl-9 pr-10 py-2.5 text-sm text-brown-950 bg-cream/50 border border-brown-950/15 rounded-lg placeholder-brown-950/30 focus:outline-none focus:ring-2 focus:ring-brown-950/20 focus:border-brown-950/40 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-950/30 hover:text-brown-950/60 transition-colors"
              >
                <Icon icon={showPassword ? 'ph:eye-slash' : 'ph:eye'} className="text-base" />
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 text-sm rounded-lg px-3 py-2.5">
              <Icon icon="ph:warning-circle" className="shrink-0 text-base" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brown-950 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-brown-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mt-2"
          >
            {loading
              ? <><Icon icon="ph:circle-notch" className="animate-spin text-base" /> Creating account...</>
              : <><Icon icon="ph:user-plus" className="text-base" /> Create account</>
            }
          </button>
        </form>

        <p className="text-sm text-brown-950/50 text-center mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-brown-950 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
