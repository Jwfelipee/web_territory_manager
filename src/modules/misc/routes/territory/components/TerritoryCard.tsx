/* eslint-disable @typescript-eslint/no-misused-promises */
import clsx from "clsx";
import { IActions, IBlock } from "../type";
import { Button } from "@/components/ui";
import { Share2 } from "react-feather";

interface BlockCardProps {
  block: IBlock;
  index: number;
  actions: IActions;
}

export function BlockCard({ index, actions, block }: BlockCardProps) {
  const ALL_HOUSES = block.negativeCompleted + block.positiveCompleted;
  const AVAILABLE_HOUSES = block.negativeCompleted;

  return (
    <div
      className={clsx(
        { "rounded-tl-none bg-transparent border-t-0": index === 0 },
        "w-[calc(100%+12px)] -ml-2 shadow-lg rounded-l-[40px] rounded-t-[40px] rounded-b-[40px] rounded-tr-none rounded-br-none min-h-[200px] p-4 px-8 border",
        "flex flex-col gap-2"
      )}
    >
      <h6 className="text-lg h-fit">{block.name}</h6>
      <div className="h-full w-full bg-gray-300 text-white">mapa aqui</div>
      <div className="w-full relative h-fit">
        <div className="flex justify-between w-10/12">
          <span>total de casas: {ALL_HOUSES}</span>
          <span>casas disponíveis: {AVAILABLE_HOUSES}</span>
        </div>
        <Button
          variant="ghost"
          className={clsx(
            "w-8 h-8 !p-0 !rounded-full bg-gray-50 shadow-xl absolute right-0 -top-1"
          )}
          onClick={() => actions.share(block.id)}
        >
          <Share2 />
        </Button>
      </div>
    </div>
  );
}
