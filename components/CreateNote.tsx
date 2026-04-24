'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { notesService } from '@/lib/services/notesService'

export default function CreateNote({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await notesService.create({ title, content })
      onCreated()
      setTitle('')
      setContent('')
      setOpen(false)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create note')
    } finally {
      setLoading(false)
    }
  }

  function close() {
    setOpen(false)
    setError('')
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-brown-950 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-brown-900 transition-colors"
      >
        <Icon icon="ph:plus-bold" className="text-sm" />
        New note
      </button>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-brown-950/20 backdrop-blur-sm px-4"
      onClick={e => e.target === e.currentTarget && close()}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl ring-1 ring-brown-950/10 p-6 mb-4 sm:mb-0">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Icon icon="ph:note-pencil" className="text-rust text-lg" />
            <h2 className="font-semibold text-brown-950">New note</h2>
          </div>
          <button
            onClick={close}
            className="text-brown-950/30 hover:text-brown-950/70 transition-colors p-1 rounded-lg hover:bg-brown-950/5"
          >
            <Icon icon="ph:x" className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="Title"
            autoFocus
            className="w-full border border-brown-950/15 bg-cream/40 rounded-xl px-4 py-3 text-sm text-brown-950 placeholder-brown-950/30 focus:outline-none focus:ring-2 focus:ring-brown-950/20 transition-all font-medium"
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            placeholder="What were you thinking..."
            rows={5}
            className="w-full border border-brown-950/15 bg-cream/40 rounded-xl px-4 py-3 text-sm text-brown-950 placeholder-brown-950/30 focus:outline-none focus:ring-2 focus:ring-brown-950/20 transition-all resize-none"
          />

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 text-sm rounded-lg px-3 py-2.5">
              <Icon icon="ph:warning-circle" className="shrink-0" />
              {error}
            </div>
          )}

          <div className="flex gap-2 justify-end pt-1">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 text-sm font-medium text-brown-950/50 hover:text-brown-950 transition-colors rounded-lg hover:bg-brown-950/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-brown-950 text-white rounded-xl px-5 py-2 text-sm font-medium hover:bg-brown-900 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {loading
                ? <><Icon icon="ph:circle-notch" className="animate-spin" /> Saving...</>
                : <><Icon icon="ph:floppy-disk" /> Save note</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
