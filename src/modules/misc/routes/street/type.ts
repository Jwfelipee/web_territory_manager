
export type IUseStreet = {
   street: Street
   actions: IActions
}

export type IActions = {
   mark: (id: number) => void
}

export type Street = {
   name: string
   houses: House[]
}

export type House = {
   id: number
   number: string
   complement: string | null
   order: number
   legend: string
   phone: string
   typeId: number
   round: Round
}

export type Round = {
   id: number
   completed: boolean
}
