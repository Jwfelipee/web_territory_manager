/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { atom } from "recoil";

type LoadState = {
   loader: 'science' | 'book' | 'none',
   message: string,
}

export const loadState = atom<LoadState>({
   key: 'loadState',
   default: {
      loader: 'science',
      message: '',
   },
});