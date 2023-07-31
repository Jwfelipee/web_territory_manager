/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from "react";
import { ISearch, ITerritory, IUseTerritory } from "./type";
import { TerritoryGateway } from "@/infra/Gateway/TerritoryGateway";
import { blockGateway } from "@/infra/Gateway/BlockGateway";
import { tokenToSend } from "@/utils/token";
import { navigatorShare } from "@/utils/share";

export const useTerritory = (): IUseTerritory => {
   const [search, setSearch] = useState<ISearch>({
      show: false,
      term: ''
   })
   const [territory, setTerritory] = useState<ITerritory>({
      id: 0,
      name: '',
      overseer: '',
      expirationTime: '',
      signatureId: 0,
      blocks: []
   })

   useEffect(() => {
      void getTerritories()
   }, [])

   const getTerritories = async (): Promise<void> => {
      const { status, data } = await TerritoryGateway.in().getBySignature()
      if (status > 299) {
         alert('Erro ao buscar os territórios')
         return
      }
      setTerritory(data?.data)
   }

   const share = async (blockId: number): Promise<void> => {
      const exist = territory.blocks.find(block => block.id === blockId)
      if (!exist) {
         alert('Quadra não encontrado')
         return
      }
      // const { status, data } = await blockGateway.signInBlock(blockId)
      // if (status > 299) {
      //    console.log({ data, status })
      //    alert('Erro ao tentar compartilhar a quadra')
      //    return
      // }
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzc4NmZiLTQ4OTgtNGEzMC1hNDI3LTI1MjFjODMwNzIwMCIsImJsb2NrSWQiOiIyIiwiaWF0IjoxNjkwODQyMzI5LCJleHAiOjE2OTA4NDI5Mjl9.2VTjoEl_gbGgnz6uyNXBSXsPd3yVzXqc2H85qW0nugE'
      const tokenToShare = tokenToSend(token)
      await navigatorShare({
         title: 'Prezado(a) publicador(a)',
         text: 'Segue o link para a quadra que você está designado(a) para pregar:',
         url: `${window.location.origin}/quadra/${tokenToShare}`
      })
   }

   return {
      search,
      setSearch,
      territory,
      actions: {
         share
      }
   }
}
