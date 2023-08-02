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
   territoryId: number
   territoryName: string
   overseer: string
   hasRound: boolean
   blocks: IBlock[]
}

export type IBlock = {
   id: number
   name: string
   signature: boolean
   negativeCompleted: number
   positiveCompleted: number
}
