import AxiosAdapter from "../http/AxiosAdapter";
import HttpClient, { ResponseHttp } from "../http/HttpClient";

class BlockGateway {
   constructor(
      private readonly httpClient: HttpClient
   ) { }

   signInBlock(data: { blockId: number; territoryId: number }): Promise<ResponseHttp> {
      return this.httpClient.post(`territories/${data.territoryId}/blocks/${data.blockId}/signature`, {})
   }

   getBlock(blockId: number, territoryId: number): Promise<ResponseHttp> {
      return this.httpClient.get(`territories/${territoryId}/blocks/${blockId}`)
   }

   revokeBlock(data: { blockId: number; territoryId: number }): Promise<ResponseHttp> {
      return this.httpClient.delete(`territories/${data.territoryId}/blocks/${data.blockId}/signature`)
   }
}

export const blockGateway = new BlockGateway(new AxiosAdapter())
