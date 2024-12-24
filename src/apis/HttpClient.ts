import Axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

export class HttpClient {
  get config(): AxiosRequestConfig {
    const config: AxiosRequestConfig = {}
    config.headers = {
      accept: 'application/json, text/plain, */*',
    }

    return config
  }

  async get<T>(
    url: string,
    params?: Record<string, unknown>,
    canceller?: AbortController,
  ): Promise<T> {
    const config: AxiosRequestConfig = { signal: canceller?.signal }
    if (params) {
      config.params = params
    }

    const response: AxiosResponse<T> = await Axios.get<T>(url, config)
    return response.data
  }
}
