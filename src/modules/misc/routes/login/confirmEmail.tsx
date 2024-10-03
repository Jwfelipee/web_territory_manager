import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthLayout, Button, Input } from "@/components/ui";
import { useState } from "react";
import { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { authState } from "@/states/auth";
import { useRecoilState } from "recoil";
import { authGateway } from "@/infra/Gateway/AuthGateway";
import { CheckCircle } from "react-feather";
import { toast } from "react-toastify";

export default function ConfirmEmail() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token") as string;
  const [old, _setAuthState] = useRecoilState(authState);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading(
      "Enviamos um email para você, fique de olho na sua caixa de entrada"
    );
    try {
      await authGateway.confirmEmail({
        email,
        token,
      });
      toast.success("Email enviado com sucesso", {
        updateId: toastId as string,
        onClose: () => {
          navigate("/new-password", {
            state: { token, email },
          });
        },
      });
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        if (status === 404) {
          return toast.error("Email não encontrado", {
            updateId: toastId as string,
          });
        }
        return toast.error("Erro ao enviar email", {
          updateId: toastId as string,
        });
      }
    } finally {
      toast.dismiss(toastId as string);
    }
  };

  return (
    <AuthLayout onSubmit={onSubmit}>
      <div className="h-4/6 flex flex-col p-4 md:w-1/2 md:justify-center">
        <div className="md:h-40 h-4/5 flex flex-col justify-evenly items-center">
          <h1 className="font-bold text-xl text-center text-gray-800 md:w-96">
            Digite o email para criar uma nova senha
          </h1>
          <div className="md:w-80 w-full flex items-center justify-between">
            <Input
              className="flex justify-between !h-12"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              placeholder="Digite seu email"
              type="email"
            />
          </div>
        </div>
        <div className="h-1/5 flex flex-col justify-center items-center gap-4">
          <Button.Root
            placeholder={"Entrar ou Login"}
            type="submit"
            className=" md:w-64 w-40 h-[60px] p-7 
             flex justify-center items-center rounded-2xl 
             focus:opacity-65"
            size="lg"
          >
            Enviar
          </Button.Root>
          <div className="text-gray-700 md:text-base text-sm">
            <Link to="/">Voltar</Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
