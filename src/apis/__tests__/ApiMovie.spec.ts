import axios from 'axios'
import { describe, it, expect, vi } from 'vitest'
import { ApiMovie } from '@/apis/movies/index'
import type { MoviesPerPage } from '@/models/MoviesPerPage'
import type { MoviesResponse } from '@/apis/movies/index.type'
import { API_MOVIES } from '@/const/api'
import { Movie } from '@/models/Movie'

vi.mock('axios')

const mockJson: MoviesResponse = {
  page: 1,
  per_page: 10,
  total: 4,
  total_pages: 1,
  data: [
    {
      Title: '50 Greatest Harry Potter Moments',
      Year: 2011,
      imdbID: 'tt2006673',
    },
    {
      Title: 'Jessica Simpson: With You/Sweetest Sin',
      Year: 2003,
      imdbID: 'tt2395252',
    },
    {
      Title: 'The Greatest Sin',
      Year: 1922,
      imdbID: 'tt4577610',
    },
    {
      Title: 'Sin Testigos',
      Year: 2015,
      imdbID: 'tt5577206',
    },
  ],
}

describe('ApiMovie', () => {
  describe('search', () => {
    it('should call api with correct url and return correct MoviesPerPage', async () => {
      const text = 'test'
      const page = 1
      const expectedUrl = `${API_MOVIES}?Title=${text}&page=${page}`
      const mockConfig = expect.anything()
      vi.mocked(axios.get).mockResolvedValue({ data: mockJson })

      const movies: MoviesPerPage = await ApiMovie.search(text, page)

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(expectedUrl, mockConfig)
      expect(movies.page).toBe(1)
      expect(movies.perPage).toBe(10)
      expect(movies.total).toBe(4)
      expect(movies.totalPages).toBe(1)

      expect(movies.data).toHaveLength(4)
      movies.data.forEach((it) => {
        expect(it instanceof Movie).toBe(true)
      })
      expect(movies.data[0]).toEqual({
        title: '50 Greatest Harry Potter Moments',
        year: 2011,
        imdbId: 'tt2006673',
      })
      expect(movies.data[1]).toEqual({
        title: 'Jessica Simpson: With You/Sweetest Sin',
        year: 2003,
        imdbId: 'tt2395252',
      })
      expect(movies.data[2]).toEqual({
        title: 'The Greatest Sin',
        year: 1922,
        imdbId: 'tt4577610',
      })
      expect(movies.data[3]).toEqual({
        title: 'Sin Testigos',
        year: 2015,
        imdbId: 'tt5577206',
      })
    })
  })
})
