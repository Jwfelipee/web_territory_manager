import { Outlet, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { User } from "react-feather";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "@/states/auth";
import { notify } from "@/utils/alert";
import { useEffect } from "react";
import { tokenToReceive } from "@/utils/token";
import { env } from "@/config/env";

export interface IDefaultLayoutProps {
  haveParams?: boolean;
}

export function DefaultLayout({ haveParams = false }: IDefaultLayoutProps) {
  const { token } = useRecoilValue(authState);
  const [_, _setAuthState] = useRecoilState(authState);
  const navigate = useNavigate();
  const params = useParams<{ accessToken: string }>();

  useEffect(() => {
    if (!token) {
      if (haveParams) {
        saveToken(params?.accessToken);
        return;
      }
      logout();
    }
  }, [token, navigate, params]);

  const saveToken = (tokenEncoded: string | undefined) => {
    if (!tokenEncoded) {
      logout();
      return;
    }
    const tokenDecoded = tokenToReceive(tokenEncoded);
    _setAuthState({ token: tokenDecoded });
    localStorage.setItem(env.storage.token, tokenDecoded);
  };

  const logout = () => {
    notify({
      title: "Aceeso negado",
      message: "Você não tem permissão para acessar essa página, faça login",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-screen bg-white relative text-gray-700">
      <div
        className={clsx(
          "absolute top-2 right-2 bg-gray-400 flex items-center justify-center rounded-full p-2"
        )}
      >
        <User />
      </div>
      <Outlet />
    </div>
  );
}
