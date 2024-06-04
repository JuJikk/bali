import React, { FC, useState } from "react";
import Container from "@/components/container/Container"; // Ensure this path is correct
import { PropertiesDetails } from "@/models/basic";
import ChartItem from "@/components/home/SingleListing/ChartSection/Chartitem";
type PropertyProps = {
  propertyDetails: PropertiesDetails;
};

const ChartSection: FC<PropertyProps> = ({ propertyDetails }) => {
  const [currentVilla, setCurrentVilla] = useState<number>(0);

  return (
    <Container>
      <div className="flex flex-col lg:items-center gap-y-8 py-11">
        <div className="font-bold text-grays-1000 lg:text-h3 text-body_l">
          Return on Investment
        </div>
        <div className="flex flex-col mr-auto gap-y-10">
          <div className="flex gap-x-4">
            {/*{propertyDetails.revenue?.map((el: any, index: number) => (*/}
              <button
                // onClick={() => setCurrentVilla(index)}
                className={`cursor-pointer flex pb-3 border-grays-400 border-b-2 text-grays-1000`}
                   // ${index === currentVilla ? "border-b-2 text-grays-800" : ""}`}
                // key={`CHTEB_${index}`}
              >
                {propertyDetails.firstContent.property.title}
              </button>
            {/*))}*/}
          </div>
        </div>
      </div>
      <div>
        <ChartItem
            image={propertyDetails.images[0].key}
          title={propertyDetails.firstContent.property.title}
          revenue={propertyDetails.revenue ?? []}
        />
      </div>
    </Container>
  );
};

export default ChartSection;
