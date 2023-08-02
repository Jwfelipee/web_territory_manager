/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/require-await */
import { useEffect, useState } from "react"
import { IUseHome, ISearch, ITerritoryCard } from "./type"
import { TerritoryGateway } from "@/infra/Gateway/TerritoryGateway"
import { tokenToSend } from "@/utils/token"
import { navigatorShare } from "@/utils/share"
import { useRecoilState } from "recoil"
import { loadState } from "@/states/load"

export const useHome = (): IUseHome => {
   const [_, _setLoadState] = useRecoilState(loadState)
   const [search, setSearch] = useState<ISearch>({
      show: false,
      term: "",
   })
   const [territoryCards, setTerritoryCards] = useState<ITerritoryCard[]>([])

   useEffect(() => {
      console.clear()
      void getTerritoryCards()
   }, [])

   async function getTerritoryCards(): Promise<void> {
      _setLoadState({ loader: 'spiral', message: 'Carregando territórios' })
      const { status, data } = await TerritoryGateway.in().get()
      if (status > 299) {
         alert('Erro ao buscar os territórios')
         return
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setTerritoryCards(data)
      _setLoadState({ loader: 'none', message: '' })
   }

   const changeRound = async (id: number): Promise<void> => {
      const territory = territoryCards.find(territory => territory.territoryId === id)
      if (!territory) {
         alert('Território não encontrado')
         return
      }
      if (territory.hasRounds) {
         void await finishRound(id)
      } else {
         void await startRound(id)
      }

      void getTerritoryCards()
   }

   const finishRound = async (id: number): Promise<void> => {
      const { status } = await TerritoryGateway.in().finishRound(id)
      if (status > 299) {
         alert('Erro ao fechar rodada do território')
         return
      }
   }

   const startRound = async (id: number): Promise<void> => {
      const { status } = await TerritoryGateway.in().startRound(id)
      if (status > 299) {
         alert('Erro ao abrir rodada do território')
         return
      }
   }

   const share = async (territoryId: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
      e.preventDefault()
      e.stopPropagation()
      const territory = territoryCards.find(territory => territory.territoryId === territoryId)
      if (!territory) {
         alert('Território não encontrado')
         return
      }
      const input = {
         overseer: territory.overseer,
         expirationTime: territory.expirationTime,
         territoryId
      }
      const { data, status } = await TerritoryGateway.in().signInTerritory(input)
      if (status > 299) {
         alert('Erro ao compartilhar o território')
         return
      }
      const { token } = data
      const origin = window.location.origin
      const tokenEncoded = tokenToSend(token)

      const toShare = {
         title: `Território para trabalhar até ${new Date(territory.expirationTime + ' GMT-3').toLocaleDateString()}`,
         url: `${origin}/territorio/${tokenEncoded}`,
         text: `Prezado irmão *_${territory.overseer}_*\nsegue o link para o território *${territory.name}* que você irá trabalhar até ${new Date(territory.expirationTime + ' GMT-3').toLocaleDateString()} \n\n\r`
      }
      await navigatorShare(toShare)
   }

   const updateData = (event: React.ChangeEvent<HTMLInputElement>, territoryId: number): void => {
      const { name, value } = event.target
      const territory = territoryCards.find(territory => territory.territoryId === territoryId)
      if (!territory) {
         alert('Território não encontrado')
         return
      }
      setTerritoryCards(old => old.map(territory => {
         if (territory.territoryId === territoryId) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (territory as any)[name] = value
         }
         return territory
      }))
   }

   const revoke = async (territoryId: number): Promise<void> => {
      const territory = territoryCards.find(territory => territory.territoryId === territoryId)
      if (!territory) {
         alert('Território não encontrado')
         return
      }
      const { status } = await TerritoryGateway.in().revoke(territoryId)
      console.log(status)
      if (status > 299) {
         alert('Erro ao revogar o território')
         return
      }

      void getTerritoryCards()

      setTerritoryCards(old => old.map(territory => {
         if (territory.territoryId === territoryId) {
            territory.expirationTime = ''
            territory.overseer = ''
         }
         return territory
      }))
   }

   return {
      search,
      setSearch,
      territoryCards,
      actions: {
         changeRound,
         share,
         updateData,
         revoke
      }
   }
}
