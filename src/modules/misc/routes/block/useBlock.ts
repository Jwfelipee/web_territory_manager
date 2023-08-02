/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from "react"
import { IBlock, IUseBlock } from "./type"
import { useNavigate } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { authState } from "@/states/auth"
import { blockGateway } from "@/infra/Gateway/BlockGateway"
import { loadState } from "@/states/load"

export const useBlock = (): IUseBlock => {
   const [block, setBlock] = useState<IBlock>({
      blockId: 0,
      blockName: '',
      territoryId: 0,
      territoryName: '',
      addresses: []
   })
   const navigate = useNavigate()
   const { blockId, territoryId } = useRecoilValue(authState)
   const [_, _setLoadState] = useRecoilState(loadState)

   useEffect(() => {
      void getBlock(blockId ?? 0, territoryId ?? 0)
   }, [blockId, territoryId])

   const getBlock = async (block: number, territory: number): Promise<void> => {
      _setLoadState({ loader: 'spiral', message: 'Buscando quadra' })
      if (!block || !territory) return
      const { status, data } = await blockGateway.getBlock(block, territory)
      if (status > 299) {
         console.log({ status, data })
         alert("Erro ao buscar a quadra")
         return
      }
      setBlock(data)
      _setLoadState({ loader: 'none', message: '' })
   }

   const goToStreet = (addressId: number): Promise<void> => {
      const exist = block.addresses.find((address) => address.id === addressId)
      if (!exist) {
         alert("Rua não encontrada")
         return Promise.resolve()
      }
      if (!blockId || !territoryId) return Promise.resolve(
         alert("Erro ao buscar a quadra")
      )
      const query = `?a=${addressId}&b=${blockId}&t=${territoryId}`
      navigate(`rua${query}`)
      return Promise.resolve()
   }

   return {
      block,
      actions: {
         goToStreet,
      }
   }
}

