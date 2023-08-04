import { Body, Button, Header } from "@/components/ui";
import clsx from "clsx";
import { useStreet } from "./useStreet";
import { ArrowLeft } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Subtitle } from "./components";
import { HouseComponent } from "./components/house";

export function StreetData() {
  const { street, actions } = useStreet();
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  const widthScreen = window.innerWidth;
  const columnsByWidth = () => {
    if (widthScreen > 800) return 8;
    if (widthScreen > 700) return 7;
    if (widthScreen > 600) return 6;
    if (widthScreen > 500) return 5;
    if (widthScreen > 400) return 4;
    if (widthScreen > 300) return 3;
    return 2;
  };

  return (
    <div className={clsx("relative")}>
      <Header size="small">
        <Button.Root
          className="!shadow-none !w-fit !p-2 absolute left-2"
          variant="ghost"
          onClick={back}
        >
          <ArrowLeft />
        </Button.Root>
        <h1 className="text-2xl font-bold">{street.streetName}</h1>
      </Header>
      <Body className="px-6 py-2">
        <h6 className="pt-4 text-xl font-semibold">CASAS</h6>
        <div
          className="grid mt-4"
          style={{
            gridTemplateColumns: `repeat(${columnsByWidth()}, minmax(0, 1fr))`,
          }}
        >
          {street.houses.map((house) => (
            <HouseComponent house={house} actions={actions} key={house.id} />
          ))}
        </div>
        {street.houses?.length ? <Subtitle /> : null}
      </Body>
    </div>
  );
}
