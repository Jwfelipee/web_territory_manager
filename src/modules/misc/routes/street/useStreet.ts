import { useQuery } from "@/hooks"
import { useEffect, useState } from "react"
import { IUseStreet, Street } from "./type"

export const useStreet = (): IUseStreet => {
   const [street, setStreet] = useState<Street>({
      name: "",
      houses: [],
   } as Street)
   const query = useQuery()
   const streetId = query.get("s")
   const blockId = query.get("b")

   useEffect(() => {
      void getStreet(Number(streetId), Number(blockId))
   }, [streetId, blockId])

   const getStreet = async (streetId: number, blockId: number) => {
      console.log(streetId, blockId)
      setStreet({
         name: "Rua da Primavera",
         houses: [
            {
               id: 6,
               number: "104",
               complement: "Apto 102",
               legend: "Apto 102",
               order: 3,
               phone: "111111111",
               typeId: 2,
               round: {
                  id: 102,
                  completed: false
               }
            },
            {
               id: 7,
               number: "206",
               complement: "Apto 201",
               legend: "Apto 201",
               order: 4,
               phone: "222222222",
               typeId: 3,
               round: {
                  id: 103,
                  completed: true
               }
            },
            {
               id: 8,
               number: "405",
               complement: "Apto 401",
               legend: "Apto 401",
               order: 5,
               phone: "333333333",
               typeId: 1,
               round: {
                  id: 104,
                  completed: false
               }
            },
            {
               id: 9,
               number: "506",
               complement: "Apto 501",
               legend: "Apto 501",
               order: 6,
               phone: "444444444",
               typeId: 2,
               round: {
                  id: 105,
                  completed: false
               }
            },
            {
               id: 10,
               number: "703",
               complement: "Apto 701",
               legend: "Apto 701",
               order: 7,
               phone: "555555555",
               typeId: 3,
               round: {
                  id: 106,
                  completed: true
               }
            },
            {
               id: 11,
               number: "808",
               complement: "Apto 801",
               legend: "Apto 801",
               order: 8,
               phone: "666666666",
               typeId: 1,
               round: {
                  id: 107,
                  completed: false
               }
            },
            {
               id: 12,
               number: "909",
               complement: "Apto 901",
               legend: "Apto 901",
               order: 9,
               phone: "777777777",
               typeId: 2,
               round: {
                  id: 108,
                  completed: false
               }
            },
            {
               id: 14,
               number: "433",
               complement: "Apto 102",
               legend: "Apto 102",
               order: 10,
               phone: "888888888",
               typeId: 3,
               round: {
                  id: 110,
                  completed: false
               }
            },
            {
               id: 15,
               number: "108",
               complement: "Apto 201",
               legend: "Apto 201",
               order: 11,
               phone: "999999999",
               typeId: 1,
               round: {
                  id: 111,
                  completed: false
               }
            },
            {
               id: 16,
               number: "222",
               complement: "Apto 401",
               legend: "Apto 401",
               order: 12,
               phone: "111111111",
               typeId: 2,
               round: {
                  id: 112,
                  completed: false
               }
            },
            {
               id: 17,
               number: "317",
               complement: "Apto 501",
               legend: "Apto 501",
               order: 13,
               phone: "222222222",
               typeId: 3,
               round: {
                  id: 113,
                  completed: false
               }
            },
            {
               id: 18,
               number: "520",
               complement: "Apto 701",
               legend: "Apto 701",
               order: 14,
               phone: "333333333",
               typeId: 1,
               round: {
                  id: 114,
                  completed: false
               }
            },
            {
               id: 19,
               number: "617",
               complement: "Apto 801",
               legend: "Apto 801",
               order: 15,
               phone: "444444444",
               typeId: 2,
               round: {
                  id: 115,
                  completed: false
               }
            },
            {
               id: 20,
               number: "709",
               complement: "Apto 901",
               legend: "Apto 901",
               order: 16,
               phone: "555555555",
               typeId: 3,
               round: {
                  id: 116,
                  completed: false
               }
            },
            {
               id: 21,
               number: "813",
               complement: "Apto 102",
               legend: "Apto 102",
               order: 17,
               phone: "666666666",
               typeId: 1,
               round: {
                  id: 117,
                  completed: false
               }
            },
            {
               id: 23,
               number: "333",
               complement: "Apto 401",
               legend: "Apto 401",
               order: 19,
               phone: "888888888",
               typeId: 2,
               round: {
                  id: 118,
                  completed: false
               }
            },
            {
               id: 24,
               number: "425",
               complement: "Apto 501",
               legend: "Apto 501",
               order: 20,
               phone: "999999999",
               typeId: 3,
               round: {
                  id: 119,
                  completed: false
               }
            },
            {
               id: 25,
               number: "517",
               complement: "Apto 701",
               legend: "Apto 701",
               order: 21,
               phone: "111111111",
               typeId: 1,
               round: {
                  id: 120,
                  completed: false
               }
            },
            {
               id: 26,
               number: "621",
               complement: "Apto 801",
               legend: "Apto 801",
               order: 22,
               phone: "222222222",
               typeId: 2,
               round: {
                  id: 121,
                  completed: false
               }
            },
            {
               id: 27,
               number: "729",
               complement: "Apto 901",
               legend: "Apto 901",
               order: 23,
               phone: "333333333",
               typeId: 3,
               round: {
                  id: 122,
                  completed: false
               }
            },
            {
               id: 28,
               number: "832",
               complement: "Apto 102",
               legend: "Apto 102",
               order: 24,
               phone: "444444444",
               typeId: 1,
               round: {
                  id: 123,
                  completed: false
               }
            },
            {
               id: 29,
               number: "924",
               complement: "Apto 201",
               legend: "Apto 201",
               order: 25,
               phone: "555555555",
               typeId: 2,
               round: {
                  id: 124,
                  completed: false
               }
            },
            {
               id: 30,
               number: "103",
               complement: "Apto 401",
               legend: "Apto 401",
               order: 26,
               phone: "666666666",
               typeId: 3,
               round: {
                  id: 125,
                  completed: false
               }
            },
            {
               id: 31,
               number: "211",
               complement: "Apto 501",
               legend: "Apto 501",
               order: 27,
               phone: "777777777",
               typeId: 1,
               round: {
                  id: 126,
                  completed: false
               }
            },
            {
               id: 32,
               number: "316",
               complement: "Apto 701",
               legend: "Apto 701",
               order: 28,
               phone: "888888888",
               typeId: 2,
               round: {
                  id: 127,
                  completed: false
               }
            },
            {
               id: 33,
               number: "424",
               complement: "Apto 801",
               legend: "Apto 801",
               order: 29,
               phone: "999999999",
               typeId: 3,
               round: {
                  id: 128,
                  completed: false
               }
            },
            {
               id: 34,
               number: "512",
               complement: "Apto 901",
               legend: "Apto 901",
               order: 30,
               phone: "111111111",
               typeId: 1,
               round: {
                  id: 129,
                  completed: false
               }
            }
         ]
      })
   }

   const markRow = (id: number) => {
      const newStreet = { ...street }
      const house = newStreet.houses.find(h => h.id === id)
      if (house) {
         house.round.completed = !house.round.completed
      }
      setStreet(newStreet)
   }

   return {
      street,
      actions: {
         mark: markRow
      }
   }
}
