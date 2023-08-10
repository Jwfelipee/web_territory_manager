export type IUseTerritory = {
   territory: ITerritory
   actions: IActions
}

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
   signature: ISignature | null
   negativeCompleted: number
   positiveCompleted: number
}

export type ISignature = {
   key: string
   expirationDate: string
}
