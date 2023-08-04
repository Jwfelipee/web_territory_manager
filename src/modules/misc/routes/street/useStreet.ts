/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useQuery } from "@/hooks"
import { useCallback, useEffect, useState } from "react"
import { IUseStreet, Street } from "./type"
import { streetGateway } from "@/infra/Gateway/StreetGateway"
import { useRecoilState } from "recoil"
import { loadState } from "@/states/load"

export const useStreet = (): IUseStreet => {
   const [street, setStreet] = useState<Street>({
      streetName: '',
      blockName: '',
      territoryName: '',
      houses: []
   } as Street)
   const query = useQuery()
   const [_, _setLoadState] = useRecoilState(loadState)
   const addressId = query.get("a")
   const blockId = query.get("b")
   const territoryId = query.get("t")
   
   const getStreet = useCallback(async (addressId: number, blockId: number, territoryId: number) => {
      _setLoadState({ loader: 'spiral', message: 'Buscando rua' })
      if (!addressId || !blockId || !territoryId) return
      const { data, status } = await streetGateway.signInStreet({ addressId, blockId, territoryId })
      if (status > 299) {
         alert("Erro ao buscar rua")
         return
      }
      setStreet({ ...data, houses: data?.houses.sort((a, b) => a.id - b.id) })
      _setLoadState({ loader: 'none', message: '' })
   }, [_setLoadState])

   useEffect(() => {
      void getStreet(Number(addressId), Number(blockId), Number(territoryId))
   }, [addressId, blockId, getStreet, territoryId])

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
      street,
      actions: {
         mark: markRow
      }
   }
}
