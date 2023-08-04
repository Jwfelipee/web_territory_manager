import { ResponseHttp } from '../http/HttpClient'

import AxiosAdapter from '../http/AxiosAdapter'
import HttpClient from '../http/HttpClient'
import { HttpMemoryAdapter } from '../http/HttpMemoryAdapter'

class TerritoryGatewayHttp {
  constructor(private readonly http: HttpClient) { }

  get(search?: string): Promise<ResponseHttp> {
    const query = search ? `?filter=${search}` : ''
    return this.http.get(`territories${query}`)
  }

  update(data: any): Promise<ResponseHttp> {
    return this.http.put(`territories/`, data)
  }

  revoke(id: number): Promise<ResponseHttp> {
    return this.http.delete(`territories/${id}/signature`)
  }

  finishRound(id: number): Promise<ResponseHttp> {
    return this.http.post(`territories/${id}/rounds/finish`)
  }

  startRound(id: number): Promise<ResponseHttp> {
    return this.http.post(`territories/${id}/rounds/start`)
  }

  signInTerritory(data: { overseer: string; expirationTime: string }, id: number): Promise<ResponseHttp> {
    return this.http.post(`territories/${id}/signatures`, data)
  }

  getById(territoryId: number): Promise<ResponseHttp> {
    return this.http.get(`territories/${territoryId}`)
  }

  getSignature(signatureId: string): Promise<ResponseHttp> {
    return this.http.get(`signature/${signatureId}`)
  }
}

const expirationTime = new Date('2023-07-31 GMT-3').toISOString()?.split('T')[0]

const territoryGatewayHttp = new TerritoryGatewayHttp(new AxiosAdapter())
const territoryGatewayMemory = new TerritoryGatewayHttp(new HttpMemoryAdapter([
  { id: '1', name: 'Territory 1', percentageCompleted: 0, rounds: false, signatureId: null, overseer: null, expirationTime: null },
  { id: '2', name: 'Territory 2', percentageCompleted: 0, rounds: true, signatureId: 3, overseer: 'Paulo', expirationTime },
  { id: '3', name: 'Territory 3', percentageCompleted: 0, rounds: false, signatureId: null, overseer: null, expirationTime: null },
  { id: '4', name: 'Territory 4', percentageCompleted: 50, rounds: false, signatureId: null, overseer: null, expirationTime: null },
  { id: '5', name: 'Territory 5', percentageCompleted: 50, rounds: false, signatureId: null, overseer: null, expirationTime: null },
  { id: '6', name: 'Territory 6', percentageCompleted: 50, rounds: false, signatureId: null, overseer: null, expirationTime: null },
  { id: '7', name: 'Territory 7', percentageCompleted: 100, rounds: true, signatureId: 1, overseer: 'Paulo', expirationTime },
  { id: '8', name: 'Territory 8', percentageCompleted: 100, rounds: true, signatureId: 2, overseer: 'Paulo', expirationTime },
]))

export class TerritoryGateway {
  static in(module: 'http' | 'memory' = 'http'): TerritoryGatewayHttp {
    return module === 'http' ? territoryGatewayHttp : territoryGatewayMemory
  }
}