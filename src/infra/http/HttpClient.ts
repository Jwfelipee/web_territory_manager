export default interface HttpClient {
  get(url: string): Promise<any>;
  post(url: string, data?: any): Promise<any>;
  put(url: string, data?: any): Promise<any>;
  postFile(url: string, data?: any): Promise<any>;
  delete(url: string): Promise<any>;
  patch(url: string, data?: any): Promise<any>;
  setToken(token: string): void;
}

export interface ResponseHttp {
  status: number;
  message?: string;
  data?: any;
}
