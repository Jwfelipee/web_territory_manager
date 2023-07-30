/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios'
import { parseCookies } from 'nookies'

import type HttpClient from './HttpClient'

const URL_API = 'https://dev-api-pavanello.tegra.com.br/api'
// const URL_API = 'http://localhost:8001/api'

export default class AxiosAdapter implements HttpClient {
  constructor() {
    axios.interceptors.request.use((config: any) => {
      const { '@eicontador/token': token } = parseCookies()
      const { '@eicontador/accountid': account } = parseCookies()
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      if (account) {
        config.headers['x-account-id'] = account
        config.headers['accountId'] = account
        config.headers['account'] = account
      }
      return config
    })
  }

  async get(url: string) {
    const httpConfig = { method: 'get' }
    return await this.axiosConfig(url, httpConfig)
  }

  async post(url: string, data: any) {
    const httpConfig = { method: 'post', data }
    return await this.axiosConfig(url, httpConfig)
  }

  async put(url: string, data: any) {
    const httpConfig = { method: 'put', data }
    return await this.axiosConfig(url, httpConfig)
  }

  async postFile(url: string, data: any) {
    const httpConfig = { method: 'post', data }
    return await this.axiosConfigFileUpload(url, httpConfig)
  }

  async delete(url: string) {
    const httpConfig = { method: 'delete' }
    return await this.axiosConfig(url, httpConfig)
  }

  private async axiosConfig(url: string, httpConfig: any) {
    try {
      const config = {
        ...httpConfig,
      }

      const response = await axios(`${URL_API}/${url}`, config)
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error: any) {
      return {
        status: error.response.status,
        message: error.response.data.error,
      }
    }
  }

  private async axiosConfigFileUpload(url: string, httpConfig: any) {
    try {
      const config = {
        ...httpConfig,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const response = await axios(`${URL_API}/${url}`, config)
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error: any) {
      return {
        status: error.response.status,
        message: error.response.data.error,
      }
    }
  }
}
