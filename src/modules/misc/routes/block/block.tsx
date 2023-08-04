import { Body, Button, Header } from "@/components/ui";
import clsx from "clsx";
import { Street } from "./components";
import { useBlock } from "./useBlock";
import { useQuery } from "@/hooks";
import { useRecoilValue } from "recoil";
import { authState } from "@/states/auth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-feather";

export function Block() {
  const query = useQuery();
  const { blockId: blockIdState, territoryId: territoryIdState } =
    useRecoilValue(authState);
  const { b: blockIdQuery, t: territoryIdQuery } = {
    b: query.get("b"),
    t: query.get("t"),
  };
  const { block, actions } = useBlock(
    Number(blockIdQuery || blockIdState),
    Number(territoryIdQuery || territoryIdState)
  );
  const navigate = useNavigate();

  const back = () => navigate(-1);

  return (
    <div className={clsx("relative")}>
      <Header>
        <div>
          <h1 className="text-xl font-semibold relative">
            <Button.Root
              className="!shadow-none !w-fit !p-2 absolute left-2"
              variant="ghost"
              onClick={back}
            >
              <ArrowLeft />
            </Button.Root>
            Olá Publicador(a),
          </h1>
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
