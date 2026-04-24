import { apiClient } from '../apiClient'
import { storage } from '../storage'

export type User = {
  id: string
  name: string
  email: string
  token?: string
}

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

  getStoredUser: (): User | null => {
    const raw = storage.get('user')
    if (!raw) return null
    try { return JSON.parse(raw) as User } catch { return null }
  },
}
