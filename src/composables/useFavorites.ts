import { LOCAL_KEY_FAVORITES } from '@/const/key'
import { Movie } from '@/models/Movie'
import { useLocalStorage, StorageSerializers, type RemovableRef } from '@vueuse/core'

type FavoriteMovies = Movie[]
const defaultMovies: FavoriteMovies = []

export function useFavorites() {
  const storage: RemovableRef<FavoriteMovies> = useLocalStorage(
    LOCAL_KEY_FAVORITES,
    defaultMovies,
    {
      serializer: StorageSerializers.object,
    },
  )

  function star(movie: Movie) {
    storage.value.push(movie)
  }

  function unStar(imdbId: Movie['imdbId']) {
    storage.value = storage.value.filter((it) => it.imdbId !== imdbId)
  }

  function isStared(imdbId: Movie['imdbId']): boolean {
    return !!storage.value.find((it) => it.imdbId === imdbId)
  }

  return { star, unStar, isStared, staredMoviesRef: storage }
}
