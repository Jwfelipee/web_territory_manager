export type IUseHome = {
   search: ISearch
   setSearch: ISetSearch
   territoryCards: ITerritoryCard[]
   actions: IActions
}

export type ISearch = {
   show: boolean
   term: string
}

export type ISetSearch = React.Dispatch<React.SetStateAction<{
   show: boolean;
   term: string;
}>>

export type ITerritoryCard = {
   id: string
   name: string
   percentageCompleted: number
   rounds: boolean
   signatureId: number | null
   overseer: string
   expirationTime: string
}

export type IActions = {
   changeRound: (id: string) => Promise<void>
   share: (territoryId: string) => Promise<void>
   updateData: (event: React.ChangeEvent<HTMLInputElement>, territoryId: string) => void
}
