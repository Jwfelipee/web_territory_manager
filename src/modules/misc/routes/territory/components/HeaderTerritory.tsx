import clsx from "clsx";
import { ISearch } from "../type";
import { Search } from "react-feather";
import { Header, Input } from "@/components/ui";

interface IHeaderHomeProps {
  search: ISearch;
}

export function HeaderTerritory({ search }: IHeaderHomeProps) {
  return (
    <Header>
      <div className="flex flex-col justify-evenly h-full">
        <h1 className="text-xl font-semibold">Olá admin</h1>
        <p className="text-sm">
          Gerencie aqui os Territórios digitais e compartilhe com os dirigentes
          do campo.
        </p>
        <div
          className={clsx(
            {
              "opacity-0 h-0 w-0 absolute -top-full -left-full pointer-events-none":
                !search.show,
            },
            "w-full flex justify-center items-center gap-1 transition-all duration-300 ease-in-out"
          )}
        >
          <Input placeholder="pesquise o território" className="border-white" />
          <Search size={16} />
        </div>
      </div>
    </Header>
  );
}
