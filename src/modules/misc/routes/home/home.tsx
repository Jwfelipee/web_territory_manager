import { Body } from "@/components/ui";
import clsx from "clsx";
import { useHome } from "./useHome";
import { HeaderHome, SearchButton, TerritoryCard } from "./components";

export default function Home() {
  const { search, territoryCards, setSearch, actions } = useHome();

  return (
    <div className={clsx("relative")}>
      <HeaderHome search={search} />
      <Body>
        <div className="h-full w-full flex flex-col gap-4">
          {territoryCards?.map((territoryCard, index) => (
            <TerritoryCard
              key={territoryCard.territoryId}
              territoryCard={territoryCard}
              index={index}
              actions={actions}
            />
          ))}
        </div>
      </Body>

      <SearchButton setSearch={setSearch} />
    </div>
  );
}
