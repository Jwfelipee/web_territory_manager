/* eslint-disable @typescript-eslint/no-misused-promises */
import clsx from "clsx";
import { IActions, ITerritoryCard } from "../type";
import { Button, Input, InputSelect } from "@/components/ui";
import { Pause, Play, Share2 } from "react-feather";

interface TerritoryCardProps {
  territoryCard: ITerritoryCard;
  index: number;
  actions: IActions;
}

export function TerritoryCard({
  territoryCard,
  index,
  actions,
}: TerritoryCardProps) {
  return (
    <div
      className={clsx(
        { "rounded-tl-none bg-transparent border-t-0": index === 0 },
        "w-[calc(100%+12px)] -ml-2 shadow-lg rounded-l-[40px] rounded-t-[40px] rounded-b-[40px] rounded-tr-none rounded-br-none min-h-[176px] p-4 border",
        "flex flex-col gap-2"
      )}
    >
      <div className="w-full h-1/5 flex items-center justify-between">
        <h6>{territoryCard.name}</h6>
        <Button
          onClick={() => actions.changeRound(territoryCard.id)}
          variant="dark"
          className="w-8 h-8 !p-0 !rounded-full"
        >
          {territoryCard.rounds ? <Pause size={16} /> : <Play size={16} />}
        </Button>
      </div>
      <div className="h-4/5 w-full flex gap-[16.66%]">
        <div className="w-5/12 flex items-start justify-center">
          <div className="h-2/3 w-full bg-gray-300 text-white">Grafico</div>
        </div>
        <div className="w-5/12 flex-col flex justify-between">
          <InputSelect
            list={[
              { label: "Dirigente", value: "" },
              { label: "Paulo", id: "Paulo" },
              { label: "Lucas", id: "Lucas" },
            ]}
            name="overseer"
            label=""
            placeholder="Dirigente"
            value={territoryCard.overseer}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            onChange={(e: any) => actions.updateData(e, territoryCard.id)}
          />
          <Input
            name="expirationTime"
            label=""
            placeholder="Prazo"
            type="date"
            value={
              territoryCard.expirationTime?.includes("T")
                ? territoryCard.expirationTime.split("T")[0]
                : territoryCard.expirationTime
            }
            onChange={(e) => actions.updateData(e, territoryCard.id)}
          />
          {territoryCard.signatureId ? (
            <Button
              onClick={() => actions.revoke(territoryCard.id)}
              className="text-xs !px-0 !justify-start"
            >
              Revogar acesso
            </Button>
          ) : (
            <div className="w-full flex justify-end">
              <Button
                variant="ghost"
                className={clsx(
                  {
                    invisible:
                      !territoryCard.overseer ||
                      !territoryCard.expirationTime ||
                      territoryCard.overseer === "Dirigente" ||
                      !territoryCard.rounds,
                  },
                  "w-8 h-8 !p-0 !rounded-full bg-gray-50 shadow-xl"
                )}
                onClick={() => actions.share(territoryCard.id)}
              >
                <Share2 />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
