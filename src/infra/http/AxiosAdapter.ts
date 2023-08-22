/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios'

import type HttpClient from './HttpClient'
import { env } from '@/config/env'

export const URL_API = 'http://territory-manager.com.br/v1'
// const URL_API = 'http://localhost:8001/api'

export default class AxiosAdapter implements HttpClient {
  constructor() {
    axios.interceptors.request.use((config: any) => {
      const token = sessionStorage.getItem(env.storage.token) ?? ''
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
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

  async patch(url: string, data?: any): Promise<any> {
    const httpConfig = { method: 'patch', data }
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
          'Content-Type': 'application/json',
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
