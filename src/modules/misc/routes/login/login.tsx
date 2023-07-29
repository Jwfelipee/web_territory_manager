import { Body, Button, Header } from "@/components/ui";
import { Input } from "@/components/ui/Input";
import { notify } from "@/utils/alert";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginData = {
  email: string;
  password: string;
};

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const navigator = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      notify({
        title: "Erro",
        message: "Preencha todos os campos",
      });
      return;
    }
    navigator("/home");
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
          <h4 className="px-8">
            Insira suas informações para realizar o login
          </h4>
          <div className="h-1/3 w-10/12 flex flex-col justify-center items-center gap-10">
            <Input
              onChange={handleChange}
              value={loginData.email}
              name="email"
              label="E-mail"
            />
            <Input
              onChange={handleChange}
              value={loginData.password}
              name="password"
              label="Senha"
              type="password"
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
