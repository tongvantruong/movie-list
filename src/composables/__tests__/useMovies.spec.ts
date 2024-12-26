import { describe, it, expect, vi } from 'vitest'
import { useMovies } from '@/composables/useMovies'
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import * as useCache from '@/composables/useCache'
import type { MoviesPerPage } from '@/models/MoviesPerPage'
import { ApiMovie } from '@/apis/movies/index'

const useDebounceFnMock = vi.hoisted(() => ({
  useDebounceFn: vi.fn(),
}))

vi.mock(import('@vueuse/core'), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    ...useDebounceFnMock,
  }
})

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

const useCacheMock = vi.hoisted(() => ({
  getCache: vi.fn(),
  setCache: vi.fn(),
  deleteCache: vi.fn(),
}))

const searchedText = ref('')
const page = ref(1)

const TestComponent = defineComponent({
  setup() {
    return {
      ...useMovies(searchedText, page),
    }
  },
  render: () => '',
})

describe('useMovies', () => {
  it('should fetch new movies 1 time on mounted if not cached', async () => {
    vi.spyOn(useCache, 'useCache').mockReturnValue(useCacheMock)
    vi.spyOn(useCacheMock, 'getCache').mockReturnValue(undefined)
    const searchSpy = vi.spyOn(ApiMovie, 'search')

    mount(TestComponent)
    expect(searchSpy).toHaveBeenCalledTimes(1)
  })
  it('should not fetch new movies on mounted if cached', async () => {
    vi.spyOn(useCache, 'useCache').mockReturnValue(useCacheMock)
    vi.spyOn(useCacheMock, 'getCache').mockReturnValue(moviesPerPageMock)
    const searchSpy = vi.spyOn(ApiMovie, 'search')

    mount(TestComponent)
    expect(searchSpy).toHaveBeenCalledTimes(0)
  })
})
