import { apiClient } from '../apiClient'
import { storage } from '../storage'

export type Note = {
  id: string
  title: string
  content: string
  created_at?: string
  updated_at?: string
}

export type NotesResponse = { data: Note[] | null; message: string; status: number }
export type NoteResponse  = { data: Note;          message: string; status: number }

export const notesService = {
  getAll: () =>
    apiClient<NotesResponse>(`/api/v1/notes`),

  create: (payload: { title: string; content: string }) =>
    apiClient<NoteResponse>(`/api/v1/notes`, { method: 'POST', body: payload }),

  update: (noteId: string, payload: { title: string; content: string }) =>
    apiClient<NoteResponse>(`/api/v1/notes/${noteId}`, { method: 'PUT', body: payload }),

  delete: (noteId: string) =>
    apiClient<{ message: string }>(`/api/v1/notes/${noteId}`, { method: 'DELETE' }),
}
