/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Outlet, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { User } from "react-feather";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "@/states/auth";
import { notify } from "@/utils/alert";
import { useEffect } from "react";
import { tokenToReceive } from "@/utils/token";
import { env } from "@/config/env";
import jwt_decode from "jwt-decode";

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
    const { overseer, territoryId, blockId, exp } = openToken(tokenDecoded);
    _setAuthState({
      token: tokenDecoded,
      overseer,
      territoryId,
      blockId,
      expirationTime: exp,
    });
    localStorage.setItem(env.storage.token, tokenDecoded);
    localStorage.setItem(env.storage.territoryId, territoryId.toString());
    localStorage.setItem(env.storage.overseer, overseer || "");
    localStorage.setItem(env.storage.blockId, blockId?.toString() || "");
    localStorage.setItem(env.storage.expirationTime, exp.toString());
  };

  const logout = () => {
    notify({
      title: "Aceeso negado",
      message: "Você não tem permissão para acessar essa página, faça login",
    });
    navigate("/login");
  };

  const openToken = (token: string) => {
    const tokenDecoded = jwt_decode<{
      overseer?: string;
      territoryId: number;
      blockId?: number;
      exp: number;
    }>(token);
    return {
      overseer: tokenDecoded?.overseer,
      territoryId: tokenDecoded?.territoryId,
      blockId: tokenDecoded?.blockId,
      exp: tokenDecoded?.exp,
    };
  };

  return (
    <div className="min-h-screen w-screen bg-slate-50 relative text-gray-700">
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
