/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/require-await */
import { useState } from "react"
import { IUseHome, ISearch, ITerritoryCard } from "./type"
import { TerritoryGateway } from "@/infra/Gateway/TerritoryGateway"

export const useHome = (): IUseHome => {
   const [search, setSearch] = useState<ISearch>({
      show: false,
      term: "",
   })
   const [territoryCards, setTerritoryCards] = useState<ITerritoryCard[]>([])

   const getTerritoryCards = async (): Promise<void> => {
      const { status, data } = await TerritoryGateway.in('memory').get()
      if (status > 299) {
         alert('Erro ao buscar os territórios')
         return
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setTerritoryCards(data)
   }

   const changeRound = async (id: string): Promise<void> => {
      setTerritoryCards(old => old.map(territory => {
         if (territory.id === id) {
            territory.rounds = !territory.rounds
         }
         return territory
      }))
   }

   const share = async (territoryId: string): Promise<void> => {
      const territory = territoryCards.find(territory => territory.id === territoryId)
      if (!territory) {
         alert('Território não encontrado')
         return
      }
      alert(`${territoryId} compartilhado com ${territory.overseer} até ${territory.expirationTime}`)
   }

   const updateData = (event: React.ChangeEvent<HTMLInputElement>, territoryId: string): void => {
      const { name, value } = event.target
      const territory = territoryCards.find(territory => territory.id === territoryId)
      if (!territory) {
         alert('Território não encontrado')
         return
      }
      setTerritoryCards(old => old.map(territory => {
         if (territory.id === territoryId) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (territory as any)[name] = value
         }
         return territory
      }))
   }

   void getTerritoryCards()
   return {
      search,
      setSearch,
      territoryCards,
      actions: {
         changeRound,
         share,
         updateData
      }
   }
}
