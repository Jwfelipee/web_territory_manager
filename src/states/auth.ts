/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { env } from "@/config/env";
import { atom } from "recoil";

type AuthState = {
   token: string
   overseer?: string
   territoryId: number
   blockId?: number
   expirationTime: number
   signatureId?: string
   mode?: string
   roles?: Partial<Roles>[]
}
 
type Roles = 'admin' | 'publisher' | 'overseer'

export const authState = atom<AuthState>({
   key: 'authState',
   default: {
      token: sessionStorage.getItem(env.storage.token) || '',
      overseer: sessionStorage.getItem(env.storage.overseer) || '',
      territoryId: Number(sessionStorage.getItem(env.storage.territoryId)) || 0,
      blockId: Number(sessionStorage.getItem(env.storage.blockId)) || 0,
      expirationTime: Number(sessionStorage.getItem(env.storage.expirationTime)) || 0,
      signatureId: sessionStorage.getItem(env.storage.signatureId) || '',
      mode: sessionStorage.getItem(env.storage.mode) || '',
      roles: (() => {
         const storage = sessionStorage.getItem(env.storage.roles) ?? ''
         if (!storage) return []
         const roles: Partial<Roles>[] = storage?.includes(',') ? storage.split(',') as any : [storage]
         return roles
      })(),
   },
});