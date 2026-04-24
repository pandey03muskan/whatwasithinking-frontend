import { storage } from './storage'

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown }

export async function apiClient<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = storage.get('token')

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: token } : {}),
    ...(options.headers as Record<string, string> ?? {}),
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message ?? data.error ?? data.detail ?? `HTTP ${res.status}`)
  return data as T
}
