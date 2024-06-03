import React, { useEffect, useRef, useState } from "react";
import { PropertiesDetails } from "@/models/basic";
import Container from "@/components/container/Container";

type StatsPropertyAdaptive = {
  propertyDetails: PropertiesDetails;
};

type StatsElType = {
  value: any;
  description: string;
  sepWidthVal: number;
};

function formatText(text: string) {
  return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
}

function StatsPropertyAdaptive({ propertyDetails }: StatsPropertyAdaptive) {
  const wrapElRef = useRef<any>(null);
  const [sepWidthVal, setSepWidthVal] = useState<number>(0);

  useEffect(() => {
    if (!wrapElRef.current) return;
    setSepWidthVal(wrapElRef.current.offsetWidth);
  }, [wrapElRef]);

  const SeparationLine = ({ sepWidthVal }: { sepWidthVal: number }) => {
    return (
        <div
            className={`absolute top-[0px] left-[0px]`}
            style={{ borderTop: "1px solid #D4D2CD", width: `${sepWidthVal}px` }}
        ></div>
    );
  };

  const StatsEl = ({ value, description, sepWidthVal }: StatsElType) => {
    return (
        <div className="flex flex-col gap-y-4 relative p-6 pl-0">
          <h1 className="font-bold text-grays-1000">{value}</h1>
          {description !== "" && (
              <h2 className="text-grays-700" style={{ whiteSpace: "pre-line" }}>{description}</h2>
          )}
          <SeparationLine sepWidthVal={sepWidthVal} />
        </div>
    );
  };

  return (
      <Container>
        <div
            ref={wrapElRef}
            className="lg:hidden flex flex-wrap w-full overflow-hidden relative"
            style={{clipPath: "inset(0% 0% round 0)"}}
        >
          <StatsEl
              value={`${propertyDetails.listing.leaseDuration} years`}
              description={`Lease duration \n + extension guaranteed`}
              sepWidthVal={sepWidthVal}
          />
          <StatsEl
              value={`${
                  propertyDetails?.construction &&
                  propertyDetails.construction[0]?.completionYear
              }`}
              description="Year Built"
              sepWidthVal={sepWidthVal}
          />
          <StatsEl
              value={propertyDetails?.properties[0] && propertyDetails?.properties[0]?.landSize}
              description="Are plot"
              sepWidthVal={sepWidthVal}
          />
          <StatsEl
              value={"123r234"}
              description="Annual ROI*"
              sepWidthVal={sepWidthVal}
          />
          <StatsEl
              value={`${
                  propertyDetails?.properties[0] && propertyDetails?.properties[0]?.bathrooms
              } m²`}
              description="Bedrooms"
              sepWidthVal={sepWidthVal}
          />
          <StatsEl
              value={
                  propertyDetails?.properties[0] && propertyDetails?.properties[0]?.buildArea
              }
              description="Building size"
              sepWidthVal={sepWidthVal}
          />
          <StatsEl
              value={`${
                  propertyDetails?.properties[0] && propertyDetails?.properties[0]?.poolSize
              } m²`}
              description="Private Pool"
              sepWidthVal={sepWidthVal}
          />
          <StatsEl
              value={formatText(propertyDetails.properties[0].equipment)}
              description=""
              sepWidthVal={sepWidthVal}
          />
          <StatsEl
              value={formatText(propertyDetails.properties[0].livingType)}
              description=""
              sepWidthVal={sepWidthVal}
          />
          <StatsEl
              value={formatText(propertyDetails.properties[0].poolType)}
              description=""
              sepWidthVal={sepWidthVal}
          />
          <StatsEl
              value={formatText(propertyDetails.properties[0].propertyType)}
              description=""
              sepWidthVal={sepWidthVal}
          />
        </div>
      </Container>
  );
}

export default StatsPropertyAdaptive;
