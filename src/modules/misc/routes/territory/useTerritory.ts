import { useEffect, useState } from "react";
import { ISearch, ITerritory, IUseTerritory } from "./type";
import { TerritoryGateway } from "@/infra/Gateway/TerritoryGateway";

export const useTerritory = (): IUseTerritory => {
   const [search, setSearch] = useState<ISearch>({
      show: false,
      term: ''
   })
   const [territory, setTerritory] = useState<ITerritory>({
      id: 1,
      name: 'Território 1',
      overseer: 'Paulo',
      expirationTime: '2021-10-10',
      signatureId: 1,
      blocks: [
         {
            id: 1,
            name: 'Bloco 1',
            expirationTime: '2021-10-10',
            signatureId: 1,
            territoryId: 1
         },
         {
            id: 2,
            name: 'Bloco 2',
            expirationTime: '2021-10-10',
            signatureId: 1,
            territoryId: 1
         }
      ]
   })

   useEffect(() => {
      void getTerritories()
   }, [])

   const getTerritories = async (): Promise<void> => {
      // const { status, data } = await TerritoryGateway.in().getBySignature()
      // if (status > 299) {
      //    alert('Erro ao buscar os territórios')
      //    return
      // }
      // console.log(data)
   }

   return {
      search,
      setSearch,
      territory,
      actions: {}
   }
}