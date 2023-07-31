/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { env } from "@/config/env";
import { atom } from "recoil";

type AuthState = {
   token: string
}

export const authState = atom<AuthState>({
   key: 'authState',
   default: {
      token: localStorage.getItem(env.storage.token) || '',
   },
});