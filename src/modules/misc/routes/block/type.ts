
export type IUseBlock = {
   block: IBlock
   actions: IActions
}

export type IActions = {
   goToStreet: (streetId: number) => Promise<void>
}

export type IBlock = {
   id: number
   name: string
   expirationTime: string
   streets: IStreet[]
}

export type IStreet = {
   id: number
   name: string
}