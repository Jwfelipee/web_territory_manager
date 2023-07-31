import clsx from "clsx";
import { HeaderTerritory, SearchButton, BlockCard } from "./components";
import { useTerritory } from "./useTerritory";
import { Body } from "@/components/ui";

export function Territory() {
  const { search, setSearch, territory, actions } = useTerritory();

  return (
    <div className={clsx("relative")}>
      <HeaderTerritory search={search} />
      <Body>
        <h2 className="w-full flex flex-col items-center h-10 text-4xl text-center pt-4 pb-8">
          Território {territory.name}
          <hr className="w-3/5" />
        </h2>
        <div className="h-full w-full flex flex-col gap-4">
          {territory.blocks?.map((block, index) => (
            <BlockCard
              key={block.id}
              block={block}
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
