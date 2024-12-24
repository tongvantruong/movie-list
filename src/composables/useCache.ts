import { SESSION_KEY_CACHE } from '@/const/key'
import { useSessionStorage } from '@vueuse/core'
import type { MoviesPerPage } from '@/models/MoviesPerPage'

type CachedKey = string
type CacheData = Map<CachedKey, MoviesPerPage>
const defaultData: CacheData = new Map()

export function useCache() {
  const storage = useSessionStorage<CacheData>(SESSION_KEY_CACHE, defaultData, {
    serializer: {
      read: (v: string) => (v ? new Map(JSON.parse(v)) : defaultData),
      write: (v: Map<CachedKey, MoviesPerPage>) => JSON.stringify([...v]),
    },
  })

  function getCache(key: CachedKey) {
    return storage.value.get(key)
  }

  function setCache(key: CachedKey, value: MoviesPerPage) {
    storage.value.set(key, value)
  }

  function deleteCache(key: CachedKey) {
    storage.value.delete(key)
  }

  return { getCache, setCache, deleteCache }
}
