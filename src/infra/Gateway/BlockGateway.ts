import AxiosAdapter from "../http/AxiosAdapter";
import HttpClient, { ResponseHttp } from "../http/HttpClient";

class BlockGateway {
   constructor(
      private readonly httpClient: HttpClient
   ) { }

   signInBlock(blockId: number): Promise<ResponseHttp> {
      return this.httpClient.post(`block/${blockId}/signature`, {})
   }
}

export const blockGateway = new BlockGateway(new AxiosAdapter())
