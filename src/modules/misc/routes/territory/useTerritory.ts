/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from "react";
import { ISearch, ITerritory, IUseTerritory } from "./type";
import { TerritoryGateway } from "@/infra/Gateway/TerritoryGateway";
import { blockGateway } from "@/infra/Gateway/BlockGateway";
import { tokenToSend } from "@/utils/token";
import { navigatorShare } from "@/utils/share";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "@/states/auth";
import { loadState } from "@/states/load";

export const useTerritory = (): IUseTerritory => {
   const [search, setSearch] = useState<ISearch>({
      show: false,
      term: ''
   })
   const [territory, setTerritory] = useState<ITerritory>({
      territoryId: 0,
      territoryName: '',
      overseer: '',
      hasRound: false,
      blocks: []
   })
   const { territoryId } = useRecoilValue(authState)
   const [_, _setLoadState] = useRecoilState(loadState)

   useEffect(() => {
      void getTerritories(territoryId)
   }, [territoryId])

   const getTerritories = async (id: number): Promise<void> => {
      _setLoadState({ loader: 'spiral', message: 'Carregando território' })
      if (!id) return
      const { status, data } = await TerritoryGateway.in().getById(id)
      if (status > 299) {
         alert('Erro ao buscar os territórios')
         return
      }
      setTerritory(data)
      _setLoadState({ loader: 'none', message: '' })
   }

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
      console.log(data)
      const token = data.token
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
