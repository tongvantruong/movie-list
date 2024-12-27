import { ApiMovie } from '@/apis/movies'
import type { MoviesPerPage } from '@/models/MoviesPerPage'
import { useDebounceFn } from '@vueuse/core'
import { computed, onMounted, ref, watch, type ComputedRef, type Ref } from 'vue'
import { useSearchData } from '@/composables/useSearchData'
import { useCache } from '@/composables/useCache'
import { SESSION_KEY_SEARCH_DATA_DEFAULT } from '@/const/key'
import { DEBOUNCE_API_TIME } from '@/const/debouce'
import { AxiosError } from 'axios'

type AppError = Error | AxiosError | null

export function useMovies(searchedText: Ref<string>, page: Ref<number>) {
  const { setCache, getCache, deleteCache } = useCache()

  const isLoading: Ref<boolean> = ref(false)
  const error: Ref<AppError> = ref(null)
  const moviesPerPage: Ref<MoviesPerPage | undefined> = ref(undefined)

  const { updateSearchData } = useSearchData(SESSION_KEY_SEARCH_DATA_DEFAULT)

  const cachedKey: ComputedRef<string> = computed(() => `${searchedText.value}-${page.value}`)

  watch(cachedKey, () => {
    updateSearchData({ searchedText: searchedText.value, page: page.value })
    if (isLoading.value) return

    if (getCache(cachedKey.value)) {
      moviesPerPage.value = getCache(cachedKey.value)
      scrollToTop()
      return
    }

    debouncedFetchMovies()
  })

  onMounted(() => {
    if (getCache(cachedKey.value)) {
      moviesPerPage.value = getCache(cachedKey.value)
      return
    }
    fetchMovies()
  })

  async function fetchMovies() {
    error.value = null
    isLoading.value = true

    try {
      moviesPerPage.value = await ApiMovie.search(searchedText.value, page.value)
      console.log('xxxxxx')
      setCache(cachedKey.value, moviesPerPage.value)
    } catch (e: unknown) {
      moviesPerPage.value = undefined
      deleteCache(cachedKey.value)
      if (e instanceof Error || e instanceof AxiosError) error.value = e
    } finally {
      isLoading.value = false
      scrollToTop()
    }
  }

  function scrollToTop() {
    document.getElementById('main')?.scrollTo(0, 0)
  }

  const debouncedFetchMovies = useDebounceFn(fetchMovies, DEBOUNCE_API_TIME)

  return { error, isLoading, moviesPerPage, fetchMovies }
}
