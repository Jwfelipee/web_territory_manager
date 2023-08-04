import AxiosAdapter from "../http/AxiosAdapter";
import HttpClient, { ResponseHttp } from "../http/HttpClient";

class StreetGateway {
   constructor(
      private readonly httpClient: HttpClient
   ) { }

   signInStreet({ addressId, territoryId, blockId }: { addressId: number; territoryId: number, blockId: number }): Promise<ResponseHttp> {
      return this.httpClient.get(`territories/${territoryId}/blocks/${blockId}/streets/${addressId}`)
   }

   markHouse(completed: boolean, houseId: number): Promise<ResponseHttp> {
      return this.httpClient.patch(`houses/${houseId}`, { completed })
   }
}

export const streetGateway = new StreetGateway(new AxiosAdapter())
