import AxiosAdapter from "../http/AxiosAdapter";
import HttpClient, { ResponseHttp } from "../http/HttpClient";

class StreetGateway {
   constructor(
      private readonly httpClient: HttpClient
   ) { }

   signInStreet(data: { addressId: number; territoryId: number, blockId: number }): Promise<ResponseHttp> {
      const query = `?addressId=${data.addressId}&territoryId=${data.territoryId}&blockId=${data.blockId}`
      return this.httpClient.get('streets/signature' + query)
   }

   markHouse(completed: boolean, houseId: number): Promise<ResponseHttp> {
      const query = `?houseId=${houseId}`
      return this.httpClient.patch('streets/signature' + query, { completed })
   }
}

export const streetGateway = new StreetGateway(new AxiosAdapter())
