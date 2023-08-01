import { useEffect, useState } from "react"
import { IBlock, IUseBlock } from "./type"
import { useNavigate } from "react-router-dom"

export const useBlock = (): IUseBlock => {
   const [block, setBlock] = useState<IBlock>({
      id: 0,
      expirationTime: '',
      name: "",
      streets: []
   })
   const navigate = useNavigate()

   useEffect(() => {
      void getBlock()
   }, [])

   const getBlock = async (): Promise<void> => {
      setBlock({
         id: 1,
         expirationTime: new Date().toDateString(),
         name: "Quadra 2",
         streets: [
            { id: 1, name: "Rua da Primavera" },
            { id: 2, name: "Rua da Acacias" },
         ],
      })
      void Promise.resolve()
   }

   const goToStreet = (streetId: number): Promise<void> => {
      const exist = block.streets.find((street) => street.id === streetId)
      if (!exist) {
         alert("Rua não encontrada")
         return
      }
      const query = `?s=${streetId}&b=${block.id}`
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

