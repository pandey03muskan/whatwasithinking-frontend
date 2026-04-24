'use client'

import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { notesService, type Note } from '@/lib/services/notesService'

type Props = {
  note: Note
  onClose: () => void
  onUpdated: () => void
}

export default function EditNote({ note, onClose, onUpdated }: Props) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
  }, [note])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await notesService.update(note.id, { title, content })
      onUpdated()
      onClose()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update note')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-brown-950/20 backdrop-blur-sm px-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl ring-1 ring-brown-950/10 p-6 mb-4 sm:mb-0">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Icon icon="ph:pencil-simple" className="text-rust text-lg" />
            <h2 className="font-semibold text-brown-950">Edit note</h2>
          </div>
          <button
            onClick={onClose}
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
              onClick={onClose}
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
                : <><Icon icon="ph:check" /> Save changes</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
