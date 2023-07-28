import { Body, Button, Header, LinkButton } from "@/components/ui";
import { Input } from "@/components/ui/Input";
import clsx from "clsx";

export default function Login() {
  return (
    <div className={clsx("relative h-full")}>
      <Header>
        <h1 className="text-2xl font-semibold">
          Bem-vindo ao Território Digital!
        </h1>
      </Header>
      <Body>
        <div
          className={clsx("flex flex-col items-center justify-around h-full")}
        >
          <h4 className="px-8">
            Insira suas informações para realizar o login
          </h4>
          <div className="h-1/3 flex flex-col justify-center items-center gap-10">
            <Input label="E-mail" />
            <Input label="Senha" type="password" />
          </div>
          <LinkButton to="/home" variant="secondary" className="w-11/12">
            Entrar
          </LinkButton>
        </div>
      </Body>
    </div>
  );
}
