export type IUseTerritory = {
   search: ISearch
   territory: ITerritory
   setSearch: ISetSearch
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


export type IActions = {
   share: (blockId: number) => Promise<void>
}


export type ITerritory = {
   id: number
   name: string
   signatureId: number | null
   overseer: string
   expirationTime: string
   // percentageCompleted: number
   blocks: IBlock[]
}

export type IBlock = {
   id: number
   name: string
   territoryId: number
   expirationTime: string
   signatureId: number
}
