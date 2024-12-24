import { API_MOVIES } from '@/const/api'
import { HttpClient } from '../HttpClient'
import type { MoviesResponse } from './index.type'
import { MoviesPerPage } from '@/models/MoviesPerPage'

const http = new HttpClient()

export class ApiMovie {
  public static async search(text: string, page: number): Promise<MoviesPerPage> {
    const json: MoviesResponse = await http.get(`${API_MOVIES}?Title=${text}&page=${page}`)
    return MoviesPerPage.fromJson(json)
  }
}
