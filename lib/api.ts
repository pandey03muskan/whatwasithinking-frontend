const BASE = 'https://whatwasithinking-production.up.railway.app'

// ─── Storage helpers ──────────────────────────────────────────────────────────

export const storage = {
  get: (key: string) => (typeof window !== 'undefined' ? localStorage.getItem(key) : null),
  set: (key: string, value: string) => typeof window !== 'undefined' && localStorage.setItem(key, value),
  remove: (...keys: string[]) => keys.forEach(k => typeof window !== 'undefined' && localStorage.removeItem(k)),
}

// ─── API client (interceptor) ─────────────────────────────────────────────────

type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown }

async function apiClient<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = storage.get('token')

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> ?? {}),
  }

  const res = await fetch(`${BASE}${endpoint}`, {
    ...options,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message ?? data.detail ?? `HTTP ${res.status}`)
  return data as T
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export type User = { id: string; name: string; email: string; token?: string }

export type AuthResponse = {
  message: string
  status: number
  user: User
}

export const authService = {
  register: (payload: { name: string; email: string; password: string }) =>
    apiClient<AuthResponse>('/api/v1/register', { method: 'POST', body: payload }),

  login: async (payload: { email: string; password: string }): Promise<AuthResponse> => {
    const data = await apiClient<AuthResponse>('/api/v1/login', { method: 'POST', body: payload })
    storage.set('token', data.user.token ?? '')
    storage.set('user_id', data.user.id)
    storage.set('user', JSON.stringify(data.user))
    return data
  },

  logout: () => storage.remove('token', 'user_id', 'user'),
}

// ─── Notes ───────────────────────────────────────────────────────────────────

export type Note = {
  id: string
  title: string
  content: string
  created_at?: string
  updated_at?: string
}

export type NotesResponse = { data: Note[] | null; message: string; status: number }
export type NoteResponse  = { data: Note;         message: string; status: number }

const uid = () => storage.get('user_id')

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
