/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Button, Header } from "@/components/ui";
import { Input } from "@/components/ui/Input";
import { env } from "@/config/env";
import { authGateway } from "@/infra/Gateway/AuthGateway";
import { authState } from "@/states/auth";
import { loadState } from "@/states/load";
import { notify } from "@/utils/alert";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import jwt_decode from "jwt-decode";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import image from "@/assets/territory_green_1.jpg";

type LoginData = {
  email: string;
  password: string;
};

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "lucas@gmail.com",
    password: "123456",
  });
  const navigator = useNavigate();
  const [old, _setAuthState] = useRecoilState(authState);
  const [__, _setLoadState] = useRecoilState(loadState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
    <div className={clsx("relative h-screen")}>
      <div className="h-2/4 flex items-center justify-center">
        <div className="max-w-[66%] rounded-full p-4 overflow-hidden bg-[#7AAD58]">
          <img src={image} className="w-full" />
        </div>
      </div>
      <Body className="h-[calc(100vh-50%)]">
        <form
          className={clsx("flex flex-col items-center justify-around h-full")}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit}
        >
          <div className="h-1/3 w-10/12 flex flex-col justify-center items-center gap-10">
            <h4>Insira suas informações para realizar o login</h4>
            <div className="w-full gap-4 flex flex-col">
              <Input
                onChange={handleChange}
                value={loginData.email}
                name="email"
                label="E-mail"
                className="!h-12"
              />
              <Input
                onChange={handleChange}
                value={loginData.password}
                name="password"
                label="Senha"
                type="password"
                className="!h-12"
              />
            </div>
          </div>
          <Button.Root
            type="submit"
            variant="secondary"
            className="w-10/12 flex !flex-row"
          >
            Entrar
          </Button.Root>
        </form>
      </Body>
    </div>
  );
}
