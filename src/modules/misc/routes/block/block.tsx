import { Body, Header } from "@/components/ui";
import clsx from "clsx";
import { Street } from "./components";
import { useBlock } from "./useBlock";

export function Block() {
  const { block, actions } = useBlock();

  return (
    <div className={clsx("relative")}>
      <Header>
        <div>
          <h1 className="text-xl font-semibold">Olá Publicador(a),</h1>
          <p>Preencha as casas da quadra onde voce falou!</p>
          <hr className="w-1/2 bg-gray-700 h-0.5 my-2" />
          <h4 className="text-2xl font-bold">{block.territoryName}</h4>
          <h5 className="text-2xl font-bold">{block.blockName}</h5>
        </div>
      </Header>
      <Body>
        <div className="h-6 w-full"></div>
        <div className="flex flex-col gap-2">
          {block.addresses?.map((address) => (
            <Street key={address.id} address={address} actions={actions} />
          ))}
        </div>
      </Body>
    </div>
  );
}
