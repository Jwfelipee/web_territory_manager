/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { env } from "@/config/env";
import { atom } from "recoil";

type AuthState = {
   token: string
   overseer?: string
   territoryId: number
   blockId?: number
   expirationTime: number
}

export const authState = atom<AuthState>({
   key: 'authState',
   default: {
      token: localStorage.getItem(env.storage.token) || '',
      overseer: localStorage.getItem(env.storage.overseer) || '',
      territoryId: Number(localStorage.getItem(env.storage.territoryId)) || 0,
      blockId: Number(localStorage.getItem(env.storage.blockId)) || 0,
      expirationTime: Number(localStorage.getItem(env.storage.expirationTime)) || 0,
   },
});