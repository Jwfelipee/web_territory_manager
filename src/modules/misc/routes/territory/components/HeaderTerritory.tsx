/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import clsx from "clsx";
import { ArrowLeft, Search } from "react-feather";
import { Button, Header, Input } from "@/components/ui";
import { useRecoilValue } from "recoil";
import { authState } from "@/states/auth";
import { useNavigate } from "react-router-dom";

interface IHeaderHomeProps {}

export function HeaderTerritory({}: IHeaderHomeProps) {
  const { overseer, roles } = useRecoilValue(authState);
  const navigate = useNavigate();
  const back = () => navigate(-1);
  return (
    <Header>
      <div className="flex flex-col justify-evenly py-6 h-full">
        <h1 className="text-xl font-semibold flex items-center">
          <Button.Root
            className={clsx("!shadow-none !w-fit !p-2", {
              hidden: !roles?.includes("admin"),
            })}
            variant="ghost"
            onClick={back}
          >
            <ArrowLeft />
          </Button.Root>
          Olá {overseer}
        </h1>
        <p className="text-sm">
          Gerencie aqui os Territórios digitais e compartilhe com os dirigentes
          do campo.
        </p>
        {/* <div
          className={clsx(
            "w-full flex justify-center items-center gap-1 transition-all duration-300 ease-in-out"
          )}
        >
          <Input
            placeholder="pesquise a quadra"
            className="border-white"
            value={search}
            onChange={handleChangeSearch}
            enterKeyHint="search"
            onKeyDown={handleSearch}
          />
          <Search size={16} />
        </div> */}
      </div>
    </Header>
  );
}
