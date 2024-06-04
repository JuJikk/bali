import React, { FC, useState } from "react";
import { Revenue } from "@/models/basic";
import Chart from "@/components/home/SingleListing/ChartSection/Chart";
import TableChart from "@/components/home/SingleListing/ChartSection/TableChart";
import Image from "next/image";

type PropertyProps = {
  revenue: Revenue[];
  title: string;
  image: string;
};

const ChartItem: FC<PropertyProps> = ({ revenue, title, image }) => {
  const [isChartVisible, setIsChartVisible] = useState<boolean>(true);

  return (
    <div className="lg:flex pb-9">
      <div className="flex flex-col justify-end lg:gap-y-16 gap-y-8  lg:w-1/2 w-full">
        <div className="flex gap-x-4 w-full">
          <Image
            width={70}
            height={70}
            src={"/images/" + image}
            alt="Preview"
            className="rounded-lg"
          />
          <div className="flex-col ">
            <h1 className="font-bold text-grays-1000 text-h3">{title}</h1>
            <h2 className="text-grays-700">4 billion IDR ($380,0232)</h2>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="font-bold text-grays-1000 text-body_l">
            Up to {revenue[1].roi}% annual ROI
          </div>
          <div className="text-grays-800">
            {Math.floor(parseFloat(revenue[0].yearsToBreakEven))} years to
            breackeven
          </div>
          <div className="flex flex-col">
            <div className="text-grays-800">
              Estimated ${" "}
              {revenue[1].passiveIn30Years
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </div>
            <div className="text-grays-800">Passive income in 30 years</div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col gap-y-6 lg:w-1/2 w-full">
        <div className="flex gap-x-4 lg:pt-[0px] pt-8">
          <button
            onClick={() => {
              setIsChartVisible(true);
            }}
            className={`flex ${!isChartVisible && "text-grays-700"}`}
          >
            Chart
          </button>
          <button
            onClick={() => {
              setIsChartVisible(false);
            }}
            className={`flex ${isChartVisible && "text-grays-700"}`}
          >
            Table
          </button>
        </div>

        <div className="flex flex-col gap-y-8">
          {isChartVisible ? (
            <Chart />
          ) : (
            <TableChart title={title} revenue={revenue} />
          )}
          {isChartVisible && (
            <div className="flex flex-col text-grays-800 gap-y-4">
              <div className="">Drag to see the passive income amount</div>
              <i>
                <p className="text-grays-500">
                  *The calculation is made solely by the listing owner Bali Home
                  Immo, baliprofit.com is in no way responsible for the accuracy
                  of provided data.
                </p>
                <p className="text-grays-500">*Based on optimistic scenario</p>
              </i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartItem;
