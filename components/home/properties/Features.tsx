import { FC } from "react";
import { PropertiesDetails } from "@/models/basic";
import Container from "@/components/container/Container";
type PropertyProps = {
  propertyDetails: PropertiesDetails;
};

const Features: FC<PropertyProps> = ({ propertyDetails }) => {
  function formatText(text: string) {
    return text
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
  }

  return (
      <>
        <Container>
          <div className="justify-center flex-col pt-8 pb-8">
            <h4 className="text-h3 leading-body_m text-grays-1000 font-bold">
              Features
            </h4>

            <div className="flex gap-x-16 flex-wrap w-full pt-10">
              {propertyDetails.firstContent.additionalDetails &&
                  propertyDetails.firstContent.additionalDetails.map(
                      (el: any, i: number) => (
                          <div className="flex gap-x-6" key={`FDAS_${i}`}>
                            <div className="text-body_s font-normal leading-body_m text-grays-700">
                              {formatText(el.feature)}
                            </div>
                          </div>
                      ),
                  )}
            </div>
          </div>
        </Container>

        <hr className="border-t border-grays-100"/>
      </>
  );
};

export default Features;
