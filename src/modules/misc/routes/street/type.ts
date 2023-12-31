
export type IUseStreet = {
   connections: number
   street: Street
   actions: IActions
}

export type IActions = {
   mark: (id: number) => Promise<void>
}

export type Street = {
   streetName: string
   territoryName: string
   blockName: string
   houses: House[]
}

export type House = {
   id: number
   number: string
   complement: string | null
   order: number
   legend: string
   status: boolean
}

export type IMessage = {
   type: string;
   data: any
 }
 