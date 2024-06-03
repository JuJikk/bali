import MapboxMap from "@/components/MapBox/MapboxMap";
import { PropertiesDetails } from "@/models/basic";
import { PlaceNearby } from "@/models/propertyListings";
import map from "@/public/images/map.png";
import Image from "next/image";
import LocationInfo from "./LocationInfo";

type PropertyProps = {
  propertyDetails: PropertiesDetails;
  placesNearby: PlaceNearby[];
  locationType: "EXACT" | "GENERAL";
};

function LocationMap({
  propertyDetails,
  placesNearby,
  locationType,
}: PropertyProps) {
  return (
    <div className="lg:flex w-full h-full lg:max-h-[500px] py-[44px]">
      <div
        className="flex gap-x-11 items-center  lg:w-1/2 w-full h-[400px] rounded-lg overflow-hidden"
        style={{ clipPath: "inset(0% 0% round 20px)" }}
      >
        <MapboxMap
          fullWidth={true}
          hoveredItemId={0}
          center={[
            parseFloat(propertyDetails.listing.longitude),
            parseFloat(propertyDetails.listing.latitude),
          ]}
          propertyItems={[propertyDetails]}
          markerStyle={locationType}
          enableUI={false}
        />
      </div>

      <div className="lg:w-1/2 w-full">
        <LocationInfo placesNearby={placesNearby} />
      </div>
    </div>
  );
}

export default LocationMap;
