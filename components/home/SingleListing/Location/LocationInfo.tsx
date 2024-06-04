import { text } from "@/const/text";
import { PlaceNearby } from "@/models/propertyListings";

type LocationInfoProps = {
  placesNearby: PlaceNearby[];
};

function LocationInfo({ placesNearby }: LocationInfoProps) {
  return (
    <div className="flex justify-center flex-col gap-7 h-full p-8 lg:pl-8 pl-[0px]">
      <h4 className="text-xl leading-body_m text-grays-1000 font-bold">
        {text.singleLising.locationSection.infoTitle.en}
      </h4>

      <div className="md:grid flex-col grid-cols-2 grid-rows-2 gap-1 flex gap-x-11 flex-wrap w-full">
        {placesNearby.map((placeNearby, i) => (
          <div className="flex gap-x-6" key={i}>
            <div className="text-body_m font-normal leading-body_m text-grays-700">
              {placeNearby.name}
            </div>

            <div className="text-grays-900 text-body_m leading-body_m font-bold">
              {placeNearby.distance} km
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationInfo;
