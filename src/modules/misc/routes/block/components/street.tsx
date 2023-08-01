import { Button } from "@/components/ui";
import clsx from "clsx";
import { ArrowRight } from "react-feather";
import { IActions, IStreet } from "../type";

interface StreetProps {
  street: IStreet;
  actions: IActions;
}

export function Street({ street, actions }: StreetProps) {
  return (
    <div
      className={clsx(
        "flex items-center w-full h-20 shadow-sm drop-shadow-xl px-10 bg-white rounded-l-[40px] rounded-t-[40px] rounded-b-[40px] rounded-tr-none rounded-br-none"
      )}
    >
      <div className={clsx("w-11/12 flex flex-col items-start")}>
        <h6 className="text-xl font-bold">{street.name}</h6>
        <p>N* de 15 à 245</p>
      </div>
      <Button
        variant="ghost"
        className={clsx("w-1/12 flex items-center justify-end !shadow-none")}
        onClick={() => void actions.goToStreet(street.id)}
      >
        <ArrowRight size={24} />
      </Button>
    </div>
  );
}
