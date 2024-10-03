import AxiosAdapter from "../http/AxiosAdapter";
import HttpClient, { ResponseHttp } from "../http/HttpClient";

class AuthGateway {
  constructor(private readonly http: HttpClient) {}

  async login(data: {
    email: string;
    password: string;
  }): Promise<ResponseHttp> {
    return this.http.post("login", data);
  }

  async confirmEmail(data: {
    email: string;
    token: string;
  }): Promise<ResponseHttp> {
    this.http.setToken(data.token);
    return this.http.post("forgot-password", {
      email: data.email,
    });
  }
}

export const authGateway = new AuthGateway(new AxiosAdapter());
