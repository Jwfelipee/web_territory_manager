import { Body, Button, Header } from "@/components/ui";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useHome } from "./useHome";
import { Input } from "@/components/ui/Input";
import { Search } from "react-feather";
import { ISetSearch } from "./type";

export default function Home() {
  const navigator = useNavigate();
  const { search, setSearch } = useHome();

  return (
    <div className={clsx("relative")}>
      <Header>
        <div className="flex flex-col justify-evenly h-full">
          <h1 className="text-xl font-semibold">Olá admin</h1>
          <p className="text-sm">
            Gerencie aqui os Territórios digitais e compartilhe com os
            dirigentes do campo.
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
            <Input
              placeholder="pesquise o território"
              className="border-white"
            />
            <Search size={16} />
          </div>
        </div>
      </Header>
      <Body>
        <Button onClick={() => navigator("/")}>Voltar</Button>
      </Body>

      <SearchButton setSearch={setSearch} />
    </div>
  );
}

const SearchButton = ({ setSearch }: { setSearch: ISetSearch }) => {
  return (
    <Button
      onClick={() => setSearch((prev) => ({ ...prev, show: !prev.show }))}
      className="fixed bottom-4 right-4 !w-10 !h-10 !p-2 !rounded-full"
    >
      <Search size={16} />
    </Button>
  );
};
