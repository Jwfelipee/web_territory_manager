export const navigatorShare = async (input: IShareInput): Promise<void> => {
   try {
      const can = navigator.canShare(input)
      if (!can) {
         alert('Não foi possível compartilhar')
         return
      }
      await navigator.share(input)
   } catch (error) {
      console.log(error)
      alert('Erro ao compartilhar')
   }
}

export interface IShareInput {
   title: string
   text: string
   url?: string
}