import { LOCAL_KEY_FAVORITES } from '@/const/key'
import type { Movie } from '@/models/Movie'
import {
  createGlobalState,
  StorageSerializers,
  useLocalStorage,
  type RemovableRef,
} from '@vueuse/core'
import { computed, type ComputedRef } from 'vue'

type FavoriteMovies = Movie[]
const defaultMovies: FavoriteMovies = []

export const favoriteStore = createGlobalState(() => {
  const storage: RemovableRef<FavoriteMovies> = useLocalStorage(
    LOCAL_KEY_FAVORITES,
    defaultMovies,
    {
      serializer: StorageSerializers.object,
    },
  )

  const favoriteMovies: ComputedRef<FavoriteMovies> = computed(() => storage.value)

  function like(movie: Movie) {
    storage.value.push(movie)
  }

  function unlike(imdbId: Movie['imdbId']) {
    storage.value = storage.value.filter((it) => it.imdbId !== imdbId)
  }

  function isLiked(imdbId: Movie['imdbId']): boolean {
    return !!storage.value.find((it) => it.imdbId === imdbId)
  }

  return { like, unlike, isLiked, favoriteMovies }
})
