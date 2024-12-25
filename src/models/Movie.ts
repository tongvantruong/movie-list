import type { MovieResponse } from '@/apis/movies/index.type'

export class Movie {
  constructor(
    public readonly title: string,
    public readonly year: number,
    public readonly imdbId: string,
  ) {}

  public static fromJson(json: MovieResponse): Movie {
    return new Movie(json.Title, json.Year, json.imdbID)
  }
}
