/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useCallback, useEffect, useState } from "react";
import { ITerritory, IUseTerritory } from "./type";
import { TerritoryGateway } from "@/infra/Gateway/TerritoryGateway";
import { blockGateway } from "@/infra/Gateway/BlockGateway";
import { tokenToSend } from "@/utils/token";
import { navigatorShare } from "@/utils/share";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "@/states/auth";
import { loadState } from "@/states/load";

export const useTerritory = (territoryId: number): IUseTerritory => {
   const [territory, setTerritory] = useState<ITerritory>({
      territoryId: 0,
      territoryName: '',
      overseer: '',
      hasRound: false,
      blocks: []
   })
   const [_, _setLoadState] = useRecoilState(loadState)
   
   const getTerritories = useCallback(async (id: number): Promise<void> => {
      _setLoadState({ loader: 'spiral', message: 'Carregando território' })
      if (!id) return
      const { status, data } = await TerritoryGateway.in().getById(id)
      if (status > 299) {
         alert('Erro ao buscar os territórios')
         _setLoadState({ loader: 'none', message: '' })
         return
      }
      console.log(data)
      const date = new Date('2023-08-10 22:30:00')
      setTerritory({ ...data, blocks: data.blocks?.map(block => ({
         ...block,
         signature: block.signature ? {
            id: 'id',
            expirationDate: date.toISOString()
         } : null
      })) })
      _setLoadState({ loader: 'none', message: '' })
   }, [_setLoadState])

   useEffect(() => {
      void getTerritories(territoryId)
   }, [getTerritories, territoryId])

   const share = async (blockId: number): Promise<void> => {
      const exist = territory.blocks.find(block => block.id === blockId)
      if (!exist) {
         alert('Quadra não encontrado')
         return
      }

      const input = {
         blockId,
         territoryId: territory.territoryId
      }
      const { status, data } = await blockGateway.signInBlock(input)
      if (status > 299) {
         console.log({ data, status })
         alert('Erro ao tentar compartilhar a quadra')
         return
      }
      const signature = data.signature as string
      await navigatorShare({
         title: 'Prezado(a) publicador(a)',
         text: 'Segue o link para a quadra que você está designado(a) para pregar:',
         url: `${window.location.origin}/quadra/${signature}`
      })

      void getTerritories(territoryId)
   }

   return {
      territory,
      actions: {
         share
      },
   }
}
