export type IUseHome = {
   search: ISearch
   setSearch: ISetSearch
}

export type ISearch = {
   show: boolean
   term: string
}

export type ISetSearch = React.Dispatch<React.SetStateAction<{
   show: boolean;
   term: string;
}>>