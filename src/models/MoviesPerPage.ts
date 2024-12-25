import { Movie } from '@/models/Movie'
import type { MoviesResponse } from '@/apis/movies/index.type'

export class MoviesPerPage {
  constructor(
    public readonly page: number,
    public readonly perPage: number,
    public readonly total: number,
    public readonly totalPages: number,
    public readonly data: Movie[],
  ) {}

  public static fromJson(json: MoviesResponse): MoviesPerPage {
    return new MoviesPerPage(
      json.page,
      json.per_page,
      json.total,
      json.total_pages,
      json.data.map(Movie.fromJson),
    )
  }
}
