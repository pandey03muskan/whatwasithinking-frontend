'use client'

import { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { type Note } from '@/lib/services/notesService'

type Props = {
  note: Note | null
  onClose: () => void
}

export default function NoteDrawer({ note, onClose }: Props) {
  useEffect(() => {
    if (!note) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [note, onClose])

  const date = note?.created_at
    ? new Date(note.created_at).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-brown-950/20 backdrop-blur-sm transition-opacity duration-300 ${note ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 w-full sm:w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${note ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brown-950/8">
          <div className="flex items-center gap-2">
            <Icon icon="ph:note-pencil" className="text-rust text-lg" />
            <span className="text-sm font-semibold text-brown-950">Note</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brown-950/40 hover:text-brown-950 hover:bg-brown-950/8 transition-colors"
          >
            <Icon icon="ph:x" className="text-lg" />
          </button>
        </div>

        {/* Content */}
        {note && (
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <h2 className="text-xl font-bold text-brown-950 leading-snug mb-3">{note.title}</h2>
            {date && (
              <div className="flex items-center gap-1.5 mb-6">
                <Icon icon="ph:calendar-blank" className="text-brown-950/30 text-sm" />
                <span className="text-xs text-brown-950/40">{date}</span>
              </div>
            )}
            <p className="text-brown-950/70 text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
          </div>
        )}
      </div>
    </>
  )
}
