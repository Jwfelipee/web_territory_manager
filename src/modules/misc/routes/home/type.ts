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
   territoryId: number
   name: string
   overseer: string
   signature: boolean
   hasRounds: boolean
   expirationTime: string
   positiveCompleted: number
   negativeCompleted: number
}

export type IActions = {
   changeRound: (id: number) => Promise<void>
   share: (territoryId: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
   updateData: (event: React.ChangeEvent<HTMLInputElement>, territoryId: number) => void
   revoke: (territoryId: number) => Promise<void>
}
