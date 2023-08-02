import AxiosAdapter from "../http/AxiosAdapter";
import HttpClient, { ResponseHttp } from "../http/HttpClient";

class BlockGateway {
   constructor(
      private readonly httpClient: HttpClient
   ) { }

   signInBlock(data: { blockId: number; territoryId: number }): Promise<ResponseHttp> {
      return this.httpClient.post(`signatures/generate`, data)
   }

   getBlock(blockId: number, territoryId: number): Promise<ResponseHttp> {
      const query = `?blockId=${blockId}&territoryId=${territoryId}`
      return this.httpClient.get(`blocks/signature${query}`)
   }
}

export const blockGateway = new BlockGateway(new AxiosAdapter())
