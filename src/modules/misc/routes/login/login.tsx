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
    _setAuthState({ ...old, token: data.token });
    localStorage.setItem(env.storage.token, data.token);
    navigator("/territorios");
    _setLoadState({ loader: "none", message: "" });
  };

  return (
    <div className={clsx("relative h-full")}>
      <Header>
        <h1 className="text-2xl font-semibold">
          Bem-vindo ao Território Digital!
        </h1>
      </Header>
      <Body>
        <form
          className={clsx("flex flex-col items-center justify-around h-full")}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit}
        >
          <div className="h-1/3 w-10/12 flex flex-col justify-center items-center gap-10">
            <h4>Insira suas informações para realizar o login</h4>
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
          <Button type="submit" variant="secondary" className="w-10/12">
            Entrar
          </Button>
        </form>
      </Body>
    </div>
  );
}
