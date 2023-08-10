/* eslint-disable @typescript-eslint/no-misused-promises */
import clsx from "clsx";
import { IActions, IBlock } from "../type";
import { Button } from "@/components/ui";
import { Share2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { DoughnutChart } from "@/components/ui/doughnutChart";
import { memo, useCallback, useEffect, useState } from "react";

interface BlockCardProps {
  block: IBlock;
  index: number;
  actions: IActions;
  territoryId: number;
}

export function BlockCard({
  index,
  actions,
  block,
  territoryId,
}: BlockCardProps) {
  const navigate = useNavigate();
  const ALL_HOUSES = block.negativeCompleted + block.positiveCompleted;
  const AVAILABLE_HOUSES = block.negativeCompleted;

  const redirect = () => {
    const query = new URLSearchParams();
    query.set("b", String(block.id));
    query.set("t", String(territoryId));
    navigate(`/quadra?${query.toString()}`);
  };

  return (
    <div
      className={clsx(
        { "rounded-tl-none bg-transparent border-t-0": index === 0 },
        "w-[calc(100%+12px)] -ml-2 shadow-lg rounded-l-[40px] rounded-t-[40px] rounded-b-[40px] rounded-tr-none rounded-br-none min-h-[200px] p-4 px-8 border",
        "flex flex-col gap-2"
      )}
    >
      <h6 className="text-lg h-fit" onClick={redirect}>
        {block.name}
      </h6>
      <div className="h-4/5 w-full flex gap-[10%]">
        <div className="w-[45%] flex flex-col items-center justify-start gap-2 text-lg">
          <div
            className={clsx(
              {
                "h-[calc(100%-20px)]": block?.name,
                hidden: !block?.name,
              },
              "w-full flex justify-start pl-2"
            )}
          >
            <DoughnutChart
              values={[block.positiveCompleted, block.negativeCompleted]}
            />
          </div>
          <div className="h-4 w-full flex justify-start items-center gap-12 text-xs">
            <div className="flex flex-col items-center w-fit gap-1">
              <div className="h-3 w-6 bg-primary"></div>À fazer
            </div>
            <div className="flex flex-col items-center w-fit gap-1">
              <div className="h-3 w-6 bg-secondary"></div>
              Concluído
            </div>
          </div>
        </div>

        <div className="w-[45%] flex-col flex justify-between">
          <div className="flex flex-col justify-around items-end w-full h-2/3">
            <span>total de casas: {ALL_HOUSES}</span>
            <span>casas disponíveis: {AVAILABLE_HOUSES}</span>
          </div>
          {block.signature ? (
            <TimeToExpire signature={block.signature} />
          ) : (
            <div className={clsx("h-1/3 w-full flex items-center")}>
              <Button.Root
                variant="secondary"
                className={clsx(
                  "text-gray-700 !fill-gray-700 !stroke-gray-700 shadow-xl w-full justify-center"
                )}
                onClick={() => actions.share(block.id)}
              >
                Enviar <Share2 size={18} />
              </Button.Root>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const TimeToExpireComponent = ({
  signature,
}: {
  signature: IBlock["signature"];
}) => {
  const [expireIn, setExpireIn] = useState<string>("");

  const timeToExpire = useCallback((endDate: string) => {
    const date = new Date(endDate);
    if (!endDate) return;
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hoursNumber = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutesNumber = Math.floor((diff / 1000 / 60) % 60);
    const secondsNumber = Math.floor((diff / 1000) % 60);
    const hours = String(hoursNumber).padStart(2, "0");
    const minutes = String(minutesNumber).padStart(2, "0");
    const seconds = String(secondsNumber).padStart(2, "0");
    setExpireIn(`${hours}:${minutes}:${seconds}`);
  }, []);

  useEffect(() => {
    if (!signature) return;
    const interval = setInterval(() => {
      timeToExpire(signature?.expirationDate || "");
    }, 1000);
    return () => clearInterval(interval);
  }, [signature, signature?.expirationDate, timeToExpire]);

  return (
    <div className="flex items-center justify-end gap-1">
      <span className="text-xs">Tempo restante:</span>{" "}
      <span className="text-xs font-semibold">{expireIn}</span>
    </div>
  );
};

const TimeToExpire = memo(TimeToExpireComponent);
