const isBrowser = typeof window !== 'undefined'

export const storage = {
  get: (key: string): string | null => (isBrowser ? localStorage.getItem(key) : null),
  set: (key: string, value: string): void => { if (isBrowser) localStorage.setItem(key, value) },
  remove: (...keys: string[]): void => { if (isBrowser) keys.forEach(k => localStorage.removeItem(k)) },
}
