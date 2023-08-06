import clsx from "clsx";
import { HeaderTerritory, SearchButton, BlockCard } from "./components";
import { useTerritory } from "./useTerritory";
import { Body } from "@/components/ui";
import { useQuery } from "@/hooks";
import { useRecoilValue } from "recoil";
import { authState } from "@/states/auth";

export function Territory() {
  const query = useQuery();
  const territoryIdQuery = query.get("t");
  const { territoryId: territoryIdState } = useRecoilValue(authState);
  const { territory, actions } = useTerritory(
    Number(territoryIdQuery || territoryIdState)
  );

  const addressTo = () => {
    //const [territoryNumber, territoryName] = territory.territoryName.split('-')
    const territoryName = `Vila Jardini`
    const street = 'AV GENERAL CARNEIRO'
    const loc = `${territoryName} ${street}`
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
    <div className={clsx("relative")}>
      <HeaderTerritory />
      <Body>
        <h2 onClick={toMapsWithNavigator} className="w-full flex flex-col items-center h-10 text-4xl text-center pt-4 pb-8">
          {territory.territoryName}
          <hr className="w-3/5" />
        </h2>
        <div className="h-full w-full flex flex-col gap-4">
          {territory.blocks?.map((block, index) => (
            <BlockCard
              key={block.id}
              block={block}
              index={index}
              actions={actions}
              territoryId={territory.territoryId}
            />
          ))}
        </div>
      </Body>
    </div>
  );
}
