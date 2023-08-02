import { Button } from "@/components/ui";
import clsx from "clsx";
import { ArrowRight } from "react-feather";
import { IActions, IAddress } from "../type";

interface AddressProps {
  address: IAddress;
  actions: IActions;
}

export function Street({ address, actions }: AddressProps) {
  const FIRST_HOUSE = address?.houses[0];
  const LAST_HOUSE = address?.houses[address?.houses.length - 1];
  return (
    <div
      className={clsx(
        "flex items-center w-full h-20 shadow-sm drop-shadow-xl px-10 bg-white rounded-l-[40px] rounded-t-[40px] rounded-b-[40px] rounded-tr-none rounded-br-none"
      )}
    >
      <div className={clsx("w-11/12 flex flex-col items-start")}>
        <h6 className="text-xl font-bold">{address.name}</h6>
        <p>
          N° de {FIRST_HOUSE} à {LAST_HOUSE}
        </p>
      </div>
      <Button
        variant="ghost"
        className={clsx("w-1/12 flex items-center justify-end !shadow-none")}
        onClick={() => void actions.goToStreet(address.id)}
      >
        <ArrowRight size={24} />
      </Button>
    </div>
  );
}
