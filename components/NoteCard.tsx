import { useState } from 'react'
import { Icon } from '@iconify/react'
import { notesService, type Note } from '@/lib/services/notesService'

type Props = {
  note: Note
  onRefresh: () => void
  onEdit: (note: Note) => void
  onView: (note: Note) => void
}

export default function NoteCard({ note, onRefresh, onEdit, onView }: Props) {
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const preview = note.content.length > 100 ? note.content.slice(0, 100) + '…' : note.content
  const date = note.created_at
    ? new Date(note.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

  async function handleDelete() {
    setDeleting(true)
    try {
      await notesService.delete(note.id)
      onRefresh()
    } catch {
      setDeleting(false)
      setConfirming(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl ring-1 ring-brown-950/10 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 onClick={() => onView(note)} className="font-semibold text-brown-950 text-sm leading-snug line-clamp-1 flex-1 cursor-pointer hover:text-rust transition-colors">{note.title}</h3>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={e => { e.stopPropagation(); onEdit(note) }}
            className="p-1 rounded-lg hover:bg-brown-950/8 text-brown-950/40 hover:text-rust transition-colors"
          >
            <Icon icon="ph:pencil-simple" className="text-sm" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); setConfirming(true) }}
            className="p-1 rounded-lg hover:bg-red-50 text-brown-950/40 hover:text-red-500 transition-colors"
          >
            <Icon icon="ph:trash" className="text-sm" />
          </button>
        </div>
      </div>

      <p className="text-brown-950/55 text-sm leading-relaxed line-clamp-3 flex-1">{preview}</p>

      {date && (
        <div className="flex items-center gap-1 mt-3">
          <Icon icon="ph:calendar-blank" className="text-brown-950/30 text-xs" />
          <p className="text-xs text-brown-950/35">{date}</p>
        </div>
      )}

      {confirming && (
        <div className="mt-3 pt-3 border-t border-brown-950/8 flex items-center justify-between">
          <p className="text-xs text-brown-950/60">Delete this note?</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setConfirming(false)}
              disabled={deleting}
              className="text-xs text-brown-950/50 hover:text-brown-950 transition-colors px-2 py-1 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-xs bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1 disabled:opacity-50"
            >
              {deleting
                ? <Icon icon="ph:circle-notch" className="animate-spin" />
                : <Icon icon="ph:trash" />
              }
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
