import React, {FC, useState} from "react";
import Chart from "./Chart";
import TableChart from "./TableChart";
import Container from "@/components/container/Container";
import {PropertiesDetails} from "@/models/basic";

const mockVillaData = [
  { title: "2 badroom villa" },
  { title: "3 badroom villa" },
];
type PropertyProps = {
  propertyDetails: PropertiesDetails;
};

const ChartSection: FC<PropertyProps> = ({ propertyDetails }) => {
  const [isChartVisible, setIsChartVisible] = useState<boolean>(true);
  const [currentVilla, setCurrentVilla] = useState<number>(0);

  return (
      <Container>
        <div className="flex flex-col lg:items-center gap-y-8 py-11">
          <div className="font-bold lg:text-h3 text-body_l">
            Return on Investment
          </div>

          <div className="flex flex-col gap-y-10">
            <div className="flex gap-x-4">
              {mockVillaData.map((el: any, index: number) => (
                  <button
                      onClick={() => setCurrentVilla(index)}
                      className={`cursor-pointer flex pb-3  border-grays-400 text-grays-500 ${
                          index === currentVilla ? "border-b-2 text-grays-800" : ""
                      }`}
                      key={`CHTEB_${index}`}
                  >
                    {el.title}
                  </button>
              ))}
            </div>

            <div className="lg:flex ">
              <div className="flex flex-col justify-end lg:gap-y-16 gap-y-8  lg:w-1/2 w-full">
                <div className="flex gap-x-4 w-full">
                  <div className="bg-grays-100 rounded-lg w-[70px] h-[70px]"></div>
                  <div className="flex-col ">
                    <h1 className="font-bold text-grays-1000 text-h3">{propertyDetails.firstContent.property.title}</h1>
                    <h2 className="text-grays-700">4 billion IDR ($380,0232)</h2>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="font-bold  text-body_l">Up to 17% annual ROI</div>
                  <div className="">4-7% to breackeven</div>
                  <div className="flex flex-col">
                    <div className="">Estimated $12039.023</div>
                    <div className="">Passive income in 30 years</div>
                  </div>
                </div>
              </div>

              <div className=" flex flex-col gap-y-6 lg:w-1/2 w-full">
                <div className="flex gap-x-4 lg:pt-[0px] pt-8">
                  <button
                      onClick={() => {
                        setIsChartVisible(true);
                      }}
                      className={`flex ${!isChartVisible && "text-grays-500"}`}
                  >
                    Chart
                  </button>
                  <button
                      onClick={() => {
                        setIsChartVisible(false);
                      }}
                      className={`flex ${isChartVisible && "text-grays-500"}`}
                  >
                    Table
                  </button>
                </div>

                <div className="flex flex-col gap-y-8">
                  {isChartVisible ? <Chart/> : <TableChart/>}

                  <div className="flex flex-col text-grays-800 gap-y-4">
                    <div className="">Drag to see the passive income amount</div>
                    <i>
                      <p>
                        *The calculation is made solely by the listing owner Bali
                        Home Immo, baliprofit.com is in no way responsible for the
                        accuracy of provided data. *Based on optimistic scenario
                      </p>
                      <p>*Based on optimistic scenario</p>
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
  );
}

export default ChartSection;
