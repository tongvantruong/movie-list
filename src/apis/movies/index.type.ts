export interface MoviesResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: MovieResponse[];
}

export interface MovieResponse {
  Title: string;
  Year: string;
  imdbID: string;
}
