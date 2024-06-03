import { FC } from "react";
import { PropertiesDetails } from "@/models/basic";
import Container from "@/components/container/Container";
import { text } from "@/const/text";
import LocationMap from "@/components/home/SingleListing/Location/LocationMap";
type PropertyProps = {
  propertyDetails: PropertiesDetails;
};

const placesNearby = [
  { name: "Billsd dsf dsf sdf ", distance: 123 },
  { name: "Sam sdfds sd ", distance: 222 },
  { name: "Bob", distance: 3.5 },
  { name: "Joe", distance: 444 },
];

const Map: FC<PropertyProps> = ({ propertyDetails }) => {
  return (
    <>
      <Container>
        <div className="w-full pt-[44px]">
          <h3 className="block font-bold text-grays-1000 text-h3 leading-h3">
            {text.singleLising.locationSection.title.en}
          </h3>

          <LocationMap
            placesNearby={placesNearby}
            propertyDetails={propertyDetails}
            locationType={propertyDetails.listing.locationType}
          />
        </div>
      </Container>

      <hr className="border-t border-grays-100"/>
    </>
  );
};

export default Map;
