import { ApiMovie } from '@/apis/movies'
import type { MoviesPerPage } from '@/models/MoviesPerPage'
import { useDebounceFn } from '@vueuse/core'
import { computed, onMounted, ref, watch, type ComputedRef, type Ref } from 'vue'

type CachedKey = string
const cachedMoviesPerPage = new Map<CachedKey, MoviesPerPage>()

export function useMovies(searchedText: Ref<string>, page: Ref<number>) {
  const isLoading: Ref<boolean> = ref(false)
  const moviesPerPage: Ref<MoviesPerPage | undefined> = ref(undefined)

  const cachedKey: ComputedRef<CachedKey> = computed(() => `${searchedText.value}-${page.value}`)

  watch(cachedKey, () => {
    if (isLoading.value) return

    if (cachedMoviesPerPage.get(cachedKey.value)) {
      moviesPerPage.value = cachedMoviesPerPage.get(cachedKey.value)
      return
    }

    debouncedFetchMovies()
  })

  onMounted(() => {
    fetchMovies()
  })

  async function fetchMovies() {
    isLoading.value = true

    try {
      moviesPerPage.value = await ApiMovie.search(searchedText.value, page.value)
      cachedMoviesPerPage.set(cachedKey.value, moviesPerPage.value)
    } catch (error: unknown) {
      moviesPerPage.value = undefined
      cachedMoviesPerPage.delete(cachedKey.value)
      console.log(error)
      // TODO: send error to a tracking system such as Sentry
    } finally {
      isLoading.value = false
    }
  }

  const debouncedFetchMovies = useDebounceFn(fetchMovies, 200)

  return { isLoading, moviesPerPage }
}
