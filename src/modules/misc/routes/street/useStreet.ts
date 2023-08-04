/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useQuery } from "@/hooks"
import { useCallback, useEffect, useState } from "react"
import { IMessage, IUseStreet, Street } from "./type"
import { streetGateway } from "@/infra/Gateway/StreetGateway"
import { useRecoilState } from "recoil"
import { loadState } from "@/states/load"
import { io } from "socket.io-client"
import { URL_API } from "@/infra/http/AxiosAdapter"

export const useStreet = (
   addressId: number,
   blockId: number,
   territoryId: number
): IUseStreet => {
   const [street, setStreet] = useState<Street>({
      streetName: '',
      blockName: '',
      territoryName: '',
      houses: []
   } as Street)
   const [_, _setLoadState] = useRecoilState(loadState)
   const [connections, setConnections] = useState<number>(0)
   const room = `${String(territoryId)}-${String(blockId)}-${String(addressId)}`;
   
   const getStreet = useCallback(async (addressId: number, blockId: number, territoryId: number) => {
      _setLoadState({ loader: 'spiral', message: 'Buscando rua' })
      if (!addressId || !blockId || !territoryId) return
      const { data, status } = await streetGateway.signInStreet({ addressId, blockId, territoryId })
      if (status > 299) {
         alert("Erro ao buscar rua")
         _setLoadState({ loader: 'none', message: '' })
         return
      }
      setStreet({ ...data, houses: data?.houses.sort((a, b) => Number(a.number) - Number(b.number)) })
      _setLoadState({ loader: 'none', message: '' })
   }, [_setLoadState])

   useEffect(() => {
      void getStreet(Number(addressId), Number(blockId), Number(territoryId))
   }, [addressId, blockId, getStreet, territoryId])

   const markRowBySocket = useCallback(({ data }: Pick<IMessage, 'data'>) => {
      const newStreet = { ...street }
      const house = newStreet.houses.find(h => h.id === data.houseId)
      if (house) {
         house.status = data.completed
      }
      setStreet(newStreet)
    }, [street])

  useEffect(() => {
   const uuid = makeUUid();
   const socket = io(URL_API, {
     transports: ["websocket"],
     query: { blockId: room },
   });
   socket.on("connect", () => {
     console.log("connect");
     socket.emit("join", `room-${room}`, uuid);
   });
   socket.on("disconnect", () => {
     console.log("disconnect");
   });
   socket.on(`room-${room}`, (message: IMessage) => {
      if (message.type === 'update_house') markRowBySocket({ data: message.data })
      if (message.type === 'user_joined') setConnections(message.data.userCount)
      if (message.type === 'user_left') setConnections(message.data.userCount)
   });

   return () => {
     socket.disconnect();
   };
 }, [markRowBySocket, room]);

 const makeUUid = () => {
   let dt = new Date().getTime();
   const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
     /[xy]/g,
     (c) => {
       const r = (dt + Math.random() * 16) % 16 | 0;
       dt = Math.floor(dt / 16);
       return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
     }
   );
   return uuid;
 };

   const markRow = async (id: number) => {
      const newStreet = { ...street }
      const house = newStreet.houses.find(h => h.id === id)
      if (house) {
         house.status = !house.status
      }
      setStreet(newStreet)
      const { status, data } = await streetGateway.markHouse(house?.status ?? false, id)
      if (status > 299) {
         alert("Erro ao marcar casa")
         return
      }
      console.log(data)
   }

   return {
      connections,
      street,
      actions: {
         mark: markRow
      }
   }
}
