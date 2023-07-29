import { useState } from "react"
import { IUseHome, ISearch } from "./type"

export const useHome = (): IUseHome => {
   const [search, setSearch] = useState<ISearch>({
      show: false,
      term: "",
   })

   return {
      search,
      setSearch,
   }
}
