/* eslint-disable @typescript-eslint/no-misused-promises */
import clsx from "clsx";
import { IActions, ITerritoryCard } from "../type";
import { Button, Input, InputSelect } from "@/components/ui";
import { Pause, Play, Share2 } from "react-feather";
import { DoughnutChart } from "@/components/ui/doughnutChart";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const redirect = () => {
    const query = new URLSearchParams();
    query.set("t", String(territoryCard.territoryId));
    navigate(`/territorio?${query.toString()}`);
  };

  return (
    <div
      className={clsx(
        { "rounded-tl-none bg-transparent border-t-0": index === 0 },
        "w-[calc(100%+12px)] -ml-2 shadow-lg rounded-l-[40px] rounded-t-[40px] rounded-b-[40px] rounded-tr-none rounded-br-none min-h-[176px] p-4 px-6 border",
        "flex flex-col gap-2"
      )}
    >
      <div className="w-full h-1/5 flex items-center justify-between">
        <h6 onClick={redirect}>{territoryCard.name}</h6>
        <Button.Root
          onClick={() => actions.changeRound(territoryCard.territoryId)}
          variant="dark"
          className="w-8 h-8 !p-0 !rounded-full"
        >
          {territoryCard.hasRounds ? <Pause size={16} /> : <Play size={16} />}
        </Button.Root>
      </div>
      <div className="h-4/5 w-full flex gap-[10%]">
        <div className="w-[45%] flex flex-col items-center justify-start gap-2 text-lg">
          {territoryCard.hasRounds ? (
            <>
              <div
                className={clsx({
                  "h-[calc(100%-20px)]": territoryCard?.name,
                  hidden: !territoryCard?.name,
                })}
              >
                <DoughnutChart
                  values={[
                    territoryCard.positiveCompleted,
                    territoryCard.negativeCompleted,
                  ]}
                />
              </div>
              <div className="h-4 w-full flex justify-start items-center gap-1 text-xs">
                <div className="flex items-center w-fit gap-1">
                  <div className="h-3 w-6 bg-primary"></div>À fazer
                </div>
                <div className="flex items-center w-fit gap-1">
                  <div className="h-3 w-6 bg-secondary"></div>
                  Concluído
                </div>
              </div>
            </>
          ) : (
            <div className="h-full w-full flex justify-center items-center">
              <p className="text-xs text-gray-400">Rodada não iniciada</p>
            </div>
          )}
        </div>

        <div className="w-[45%] flex-col flex justify-between">
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              actions.updateData(e, territoryCard.territoryId)
            }
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
            className={clsx({ "bg-secondary": !territoryCard.expirationTime })}
            onChange={(e) => actions.updateData(e, territoryCard.territoryId)}
          />
          {territoryCard.signature ? (
            <Button.Root
              onClick={() => actions.revoke(territoryCard.territoryId)}
              className="text-xs !px-2 !justify-start"
              variant="secondary"
            >
              Revogar acesso
            </Button.Root>
          ) : (
            <div className="w-full flex justify-end">
              <Button.Root
                variant="ghost"
                className={clsx(
                  {
                    invisible:
                      !territoryCard.overseer ||
                      !territoryCard.expirationTime ||
                      territoryCard.overseer === "Dirigente" ||
                      !territoryCard.hasRounds,
                  },
                  "w-8 h-8 !p-0 !rounded-full bg-gray-50 shadow-xl"
                )}
                onClick={(e) => actions.share(territoryCard.territoryId, e)}
              >
                <Share2 />
              </Button.Root>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
