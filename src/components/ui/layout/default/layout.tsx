/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Outlet, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { User } from "react-feather";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "@/states/auth";
import { notify } from "@/utils/alert";
import { useEffect } from "react";
import { env } from "@/config/env";
import jwt_decode from "jwt-decode";
import { TerritoryGateway } from "@/infra/Gateway/TerritoryGateway";

export interface IDefaultLayoutProps {
  haveParams?: boolean;
}

export function DefaultLayout({ haveParams = false }: IDefaultLayoutProps) {
  const { token } = useRecoilValue(authState);
  const [_, _setAuthState] = useRecoilState(authState);
  const navigate = useNavigate();
  const params = useParams<{ signature_id: string }>();

  useEffect(() => {
    // void saveSignature(params?.signature_id);
    if (!token) {
      if (haveParams) {
        void saveSignature(params?.signature_id);
        return;
      }
      logout();
    }
  }, [token, navigate, params]);

  const saveSignature = async (signatureId: string | undefined) => {
    if (!signatureId) {
      logout();
      return;
    }
    const { data, status } = await TerritoryGateway.in().getSignature(
      signatureId
    );
    if (status > 299) {
      alert("Erro ao buscar assinatura");
      // logout();
      return;
    }
    const { token, mode } = data;
    console.log({ token, mode });
    const { overseer, territoryId, blockId, exp } = openToken(token);
    // _setAuthState({
    //   token,
    //   overseer,
    //   territoryId,
    //   blockId,
    //   expirationTime: exp,
    //   signatureId,
    //   mode,
    // });
    // sessionStorage.setItem(env.storage.token, token);
    // sessionStorage.setItem(env.storage.territoryId, territoryId.toString());
    // sessionStorage.setItem(env.storage.overseer, overseer || "");
    // sessionStorage.setItem(env.storage.blockId, blockId?.toString() || "");
    // sessionStorage.setItem(env.storage.expirationTime, exp.toString());
    // sessionStorage.setItem(env.storage.signatureId, signatureId);
    // sessionStorage.setItem(env.storage.mode, mode);
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
    console.log({ tokenDecoded });
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
