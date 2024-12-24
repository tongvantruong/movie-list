import { LOCAL_KEY_FAVORITES } from '@/const/key'
import { Movie } from '@/models/Movie'
import { useLocalStorage, StorageSerializers } from '@vueuse/core'

type FavoriteMovies = Movie[]
const defaultMovies: FavoriteMovies = []

export function useFavorites() {
  const storage = useLocalStorage<FavoriteMovies>(LOCAL_KEY_FAVORITES, defaultMovies, {
    serializer: StorageSerializers.object,
  })

  function star(movie: Movie) {
    storage.value.push(movie)
  }

  function unStar(movie: Movie) {
    storage.value = storage.value.filter((it) => it.imdbId !== movie.imdbId)
  }

  function isStared(movie: Movie): boolean {
    return !!storage.value.find((it) => it.imdbId === movie.imdbId)
  }

  return { star, unStar, isStared, staredMoviesRef: storage }
}
