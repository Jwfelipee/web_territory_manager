import HttpClient, { ResponseHttp } from "./HttpClient";

export class HttpMemoryAdapter<T> implements HttpClient {

   private readonly data: Array<T>;

   constructor(data: Array<T>) {
      this.data = data;
   }

   async get(url: string): Promise<ResponseHttp> {
      await sleep(500)
      return Promise.resolve({ status: 200, data: this.data });
   }

   async post(url: string, data: T): Promise<ResponseHttp> {
      await sleep(500)
      return Promise.resolve({ status: 200, data: data });
   }

   async put(url: string, data: T): Promise<ResponseHttp> {
      await sleep(500)
      return Promise.resolve({ status: 200, data: data });
   }

   async patch(url: string, data: T): Promise<ResponseHttp> {
      await sleep(500)
      return Promise.resolve({ status: 200, data: data });
   }

   async postFile(url: string, data: any): Promise<ResponseHttp> {
      await sleep(500)
      return Promise.resolve({ status: 200, data: data });
   }

   async delete(url: string): Promise<ResponseHttp> {
      await sleep(500)
      return Promise.resolve({ status: 200 });
   }
}
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));