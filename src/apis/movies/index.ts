import { API_MOVIES } from '@/const/api'
import { HttpClient } from '@/apis/HttpClient'
import type { MoviesResponse } from '@/apis/movies/index.type'
import { MoviesPerPage } from '@/models/MoviesPerPage'

const http = new HttpClient()

export class ApiMovie {
  public static async search(text: string, page: number): Promise<MoviesPerPage> {
    const json: MoviesResponse = await http.get(`${API_MOVIES}?Title=${text}&page=${page}`)
    return MoviesPerPage.fromJson(json)
  }
}
