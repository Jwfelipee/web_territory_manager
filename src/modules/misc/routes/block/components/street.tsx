import { Button } from "@/components/ui";
import clsx from "clsx";
import { ArrowRight, MapPin } from "react-feather";
import { IActions, IAddress, IBlock } from "../type";

interface AddressProps {
  block: Omit<IBlock, 'addresses'>
  address: IAddress;
  actions: IActions;
}

export function Street({ address, actions, block }: AddressProps) {
  const FIRST_HOUSE = address?.houses[0];
  const LAST_HOUSE = address?.houses[address?.houses.length - 1];
  
  const addressTo = () => {
    const [territoryNumber, territoryName] = block.territoryName.split('-')
    const loc = `${territoryName} ${address.name}`
      return loc
  }

  const toMaps = () => {
    const loc = addressTo()
    const encoded = encodeURI(loc)
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encoded}`
    window.open(mapsUrl, '_target')
  }
  
  const toMapsWithNavigator = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const  longitude = position.coords.longitude;
    
        // Use latitude e longitude como desejar
        //alert("Latitude: " + latitude + ", Longitude: " + longitude);
        const origin = `origin=${latitude},${longitude}`
        const to = addressTo()
        const encoded = encodeURI(to)

        const destination = `destination=${encoded}`
        const urlMaps = `https://www.google.com/maps/dir/?api=1&${origin}&${destination}`
        //alert(urlMaps)
        window.open(urlMaps, '_target')
      });
    } else {
      alert('nao suportado')
    }
  }
  
  return (
    <div
      className={clsx(
        "flex items-center w-full h-20 shadow-sm drop-shadow-xl px-10 bg-white rounded-l-[40px] rounded-t-[40px] rounded-b-[40px] rounded-tr-none rounded-br-none"
      )}
    >
      <div className={clsx("w-11/12 flex flex-col items-start")}>
        <div className="flex items-center justify-start gap-4">
        <MapPin onClick={toMapsWithNavigator} />
        <h6 className="text-xl font-bold">{address.name}</h6>
        </div>
        <p>
          N° de {FIRST_HOUSE} à {LAST_HOUSE}
        </p>
      </div>
      <Button.Root
        variant="ghost"
        className={clsx(
          "w-1/12 flex items-center justify-center !shadow-non !p-0 h-8 text-primary font-bold"
        )}
        onClick={() => void actions.goToStreet(address.id)}
      >
        <Button.Icon icon={ArrowRight} size={24} />
      </Button.Root>
    </div>
  );
}
