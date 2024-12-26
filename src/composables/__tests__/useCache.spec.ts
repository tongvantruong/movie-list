import { describe, it, expect, vi, afterEach } from 'vitest'
import { useCache } from '@/composables/useCache'
import { SESSION_KEY_CACHE } from '@/const/key'
import type { MoviesPerPage } from '@/models/MoviesPerPage'

const moviesPerPageMock: MoviesPerPage = {
  page: 1,
  total: 2,
  perPage: 10,
  totalPages: 1,
  data: [
    { title: 'Movie 1', year: 1991, imdbId: 'tt2395201' },
    { title: 'Movie 2', year: 1991, imdbId: 'tt2395202' },
  ],
}

describe('useCache', () => {
  it('should return undefined if not cached', () => {
    const key = 'text-1'
    const { getCache } = useCache()
    expect(getCache(key)).toEqual(undefined)
  })
  it('should return cached value if cached', () => {
    const key = 'text-1'
    const { getCache, setCache } = useCache()
    setCache(key, moviesPerPageMock)
    expect(getCache(key)).toEqual(moviesPerPageMock)
  })
  it('should be able to delete cached value by key', () => {
    const key = 'text-1'
    const { getCache, setCache, deleteCache } = useCache()
    setCache(key, moviesPerPageMock)
    expect(getCache(key)).toEqual(moviesPerPageMock)
    deleteCache(key)
    expect(getCache(key)).toEqual(undefined)
  })
})
