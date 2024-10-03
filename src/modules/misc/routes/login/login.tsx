/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AuthLayout, Body, Button, Header } from "@/components/ui";
import { Input } from "@/components/ui/Input";
import { env } from "@/config/env";
import { authGateway } from "@/infra/Gateway/AuthGateway";
import { authState } from "@/states/auth";
import { loadState } from "@/states/load";
import { notify } from "@/utils/alert";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import jwt_decode from "jwt-decode";
import { sleep } from "@/utils/sleep";
import { io } from "socket.io-client";
import { URL_API } from "@/infra/http/AxiosAdapter";

type LoginData = {
  email: string;
  password: string;
};

let render = 0;
export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "joaowictor756@gmail.com",
    password: "123456",
  });
  const navigator = useNavigate();
  const [old, _setAuthState] = useRecoilState(authState);
  const [__, _setLoadState] = useRecoilState(loadState);

  useEffect(() => {
    if (!render) {
      render++;
      return;
    }
    const socket = io("", {
      transports: ["websocket"],
      auth: {
        token: sessionStorage.getItem(env.storage.token) || "",
      },
    });

    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("uploadProgress", (data: any) => {
      console.log("by socket", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      notify({
        title: "Erro",
        message: "Preencha todos os campos",
      });
      return;
    }
    _setLoadState({ loader: "spiral", message: "Realizando login" });

    const { status, data } = await authGateway.login(loginData);
    if (status > 299) {
      notify({
        title: "Erro",
        message: data.message || "Erro ao realizar login",
      });
      return;
    }
    const { overseer, territoryId, blockId, exp, roles } = openToken(
      data.token
    );
    _setAuthState({
      token: data.token,
      overseer,
      territoryId,
      blockId,
      expirationTime: exp,
      signatureId: "",
      mode: "default",
      roles,
    });
    sessionStorage.setItem(env.storage.token, data.token);
    sessionStorage.setItem(env.storage.territoryId, territoryId?.toString());
    sessionStorage.setItem(env.storage.overseer, overseer || "");
    sessionStorage.setItem(env.storage.blockId, blockId?.toString() || "");
    sessionStorage.setItem(env.storage.expirationTime, exp?.toString());
    sessionStorage.setItem(env.storage.roles, roles.join(","));
    await sleep(1000);
    navigator("/territorios");
    _setLoadState({ loader: "none", message: "" });
  };

  const openToken = (token: string) => {
    const tokenDecoded = jwt_decode<{
      overseer?: string;
      territoryId: number;
      blockId?: number;
      exp: number;
      roles: string[];
    }>(token);
    return {
      overseer: tokenDecoded?.overseer,
      territoryId: tokenDecoded?.territoryId,
      blockId: tokenDecoded?.blockId,
      exp: tokenDecoded?.exp,
      roles: tokenDecoded?.roles as any,
    };
  };

  return (
    <AuthLayout onSubmit={handleSubmit}>
      <div className="h-full flex flex-col gap-8 p-4 md:w-1/2 md:justify-center">
        <div className="md:h-40 h-4/5 flex flex-col justify-evenly items-center">
          <h1 className="font-bold text-xl text-gray-800 md:hidden">
            Insira suas informações para realizar o login
          </h1>
          <div className="md:w-80 w-full justify-around flex flex-col items-center gap-4">
            <Input
              value={loginData.email}
              onChange={handleChange}
              className="!h-12"
              name="email"
              label="E-mail"
              placeholder="Digite seu e-mail"
              autoFocus
              type="text"
            />
            <Input
              value={loginData.password}
              onChange={handleChange}
              className="!h-12"
              name="password"
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              minLength={6}
            />
          </div>
        </div>
        <div className="h-1/5 min-h-[40px] flex flex-col justify-center items-center gap-4">
          <Button.Root
            placeholder={"Entrar ou Login"}
            type="submit"
            className="
            md:w-64 w-40 h-[60px] p-7 
            flex justify-center items-center rounded-2xl 
            focus:opacity-65
            "
            size="lg"
          >
            Entrar
          </Button.Root>
          <Link
            to="/confirmar-email"
            className="text-gray-700 md:text-base text-sm hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
