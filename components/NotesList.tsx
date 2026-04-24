'use client'

import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { notesService, type Note } from '@/lib/services/notesService'
import NoteCard from './NoteCard'
import CreateNote from './CreateNote'
import EditNote from './EditNote'
import NoteDrawer from './NoteDrawer'

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [viewingNote, setViewingNote] = useState<Note | null>(null)

  function fetchNotes() {
    setLoading(true)
    notesService.getAll()
      .then(res => setNotes(res.data ?? []))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load notes'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchNotes() }, [])

  return (
    <div className="w-full px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-brown-950">My notes</h1>
          {!loading && (
            <p className="text-sm text-brown-950/45 mt-0.5 flex items-center gap-1">
              <Icon icon="ph:note" className="text-sm" />
              {notes.length === 0 ? 'No notes yet' : `${notes.length} note${notes.length === 1 ? '' : 's'}`}
            </p>
          )}
        </div>
        <CreateNote onCreated={fetchNotes} />
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2].map(i => (
            <div key={i} className="bg-white rounded-2xl ring-1 ring-brown-950/8 p-5 animate-pulse">
              <div className="h-4 bg-brown-950/8 rounded-lg w-3/4 mb-3" />
              <div className="h-3 bg-brown-950/5 rounded-lg w-full mb-2" />
              <div className="h-3 bg-brown-950/5 rounded-lg w-5/6" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 bg-red-50 rounded-2xl ring-1 ring-red-100 p-5 text-red-700">
          <Icon icon="ph:warning-circle" className="text-xl shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && notes.length === 0 && (
        <div className="text-center py-24">
          <div className="w-16 h-16 rounded-2xl bg-white ring-1 ring-brown-950/10 flex items-center justify-center mx-auto mb-5 shadow-sm">
            <Icon icon="ph:note-blank" className="text-3xl text-rust/60" />
          </div>
          <h3 className="text-sm font-semibold text-brown-950 mb-1.5">Nothing here yet</h3>
          <p className="text-sm text-brown-950/45 max-w-xs mx-auto leading-relaxed">
            Capture your first thought before it slips away.
          </p>
        </div>
      )}

      {!loading && !error && notes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onRefresh={fetchNotes}
              onEdit={setEditingNote}
              onView={setViewingNote}
            />
          ))}
        </div>
      )}

      {editingNote && (
        <EditNote
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onUpdated={fetchNotes}
        />
      )}

      <NoteDrawer note={viewingNote} onClose={() => setViewingNote(null)} />
    </div>
  )
}
