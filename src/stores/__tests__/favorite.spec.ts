import { describe, expect, it } from 'vitest'
import { favoriteStore } from '@/stores/favorite'
import type { Movie } from '@/models/Movie'
import { beforeEach } from 'vitest'

const movie: Movie = {
  title: 'Test',
  year: 2024,
  imdbId: 'test imdbId',
}

describe('favoriteStore', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })
  it('should return empty array by default', () => {
    const { favoriteMovies } = favoriteStore()
    expect(favoriteMovies.value).toEqual([])
  })
  it('should save/remove the movie if like/unlike', () => {
    const { favoriteMovies, like, unlike } = favoriteStore()
    expect(favoriteMovies.value).toEqual([])
    like(movie)
    expect(favoriteMovies.value).toEqual([movie])
    unlike(movie.imdbId)
    expect(favoriteMovies.value).toEqual([])
  })
  it('should return true for isLiked if existed', () => {
    const { favoriteMovies, like, unlike, isLiked } = favoriteStore()
    expect(favoriteMovies.value).toEqual([])
    like(movie)
    expect(favoriteMovies.value).toEqual([movie])
    expect(isLiked(movie.imdbId)).toBe(true)
    unlike(movie.imdbId)
    expect(isLiked(movie.imdbId)).toBe(false)
  })
})
