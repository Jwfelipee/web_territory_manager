
export type IUseBlock = {
   block: IBlock
   actions: IActions
}

export type IActions = {
   goToStreet: (streetId: number) => Promise<void>
}

export type IBlock = {
   territoryId: number
   territoryName: string
   blockId: number
   blockName: string
   addresses: IAddress[]
}

export type IAddress = {
   id: number
   name: string
   houses: House[]
}

export type House = string
