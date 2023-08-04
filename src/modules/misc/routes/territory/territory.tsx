import clsx from "clsx";
import { HeaderTerritory, SearchButton, BlockCard } from "./components";
import { useTerritory } from "./useTerritory";
import { Body } from "@/components/ui";
import { useQuery } from "@/hooks";
import { useRecoilValue } from "recoil";
import { authState } from "@/states/auth";

export function Territory() {
  const query = useQuery();
  const territoryIdQuery = query.get("t");
  const { territoryId: territoryIdState } = useRecoilValue(authState);
  const { search, setSearch, territory, actions } = useTerritory(
    Number(territoryIdQuery || territoryIdState)
  );

  return (
    <div className={clsx("relative")}>
      <HeaderTerritory search={search} />
      <Body>
        <h2 className="w-full flex flex-col items-center h-10 text-4xl text-center pt-4 pb-8">
          {territory.territoryName}
          <hr className="w-3/5" />
        </h2>
        <div className="h-full w-full flex flex-col gap-4">
          {territory.blocks?.map((block, index) => (
            <BlockCard
              key={block.id}
              block={block}
              index={index}
              actions={actions}
              territoryId={territory.territoryId}
            />
          ))}
        </div>
      </Body>

      <SearchButton setSearch={setSearch} />
    </div>
  );
}
