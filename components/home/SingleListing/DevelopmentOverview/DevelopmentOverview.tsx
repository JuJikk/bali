"use client";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { useEffect } from "react";
import { ImageRes } from "@/models/basic";

type DevelopmentOverviewProps = {
  images: ImageRes[] | undefined;
};

type TimelineItemProps = {
  title: string;
  subtitle: string;
  percent: string;
  images: ImageRes[] | undefined;
  allowLine?: boolean;
};

const mockPercent = 51;

function DevelopmentOverview({ images }: DevelopmentOverviewProps) {
  return (
    <div className="w-full flex items-center flex-col gap-y-11 pt-8">
      <div>
        <h3 className="sm:block hidden text-h3 leading-h3 text-center font-bold">
          Development Overview
        </h3>
        <h3 className="sm:hidden text-4 leading-body_m text-center font-bold">
          Development Overview
        </h3>
      </div>

      <div className="flex justify-center items-center pb-11">
        <Timeline images={images} />
      </div>
    </div>
  );
}

export default DevelopmentOverview;

const TimelineItem = ({
  title,
  subtitle,
  percent,
  images = [],
  allowLine = false,
}: TimelineItemProps) => {
  useEffect(() => {
    const percentFilledList: NodeListOf<HTMLElement> =
      document.querySelectorAll(".percent-filled");
    if (percentFilledList[0] && mockPercent < 50) {
      percentFilledList[0].style.height = `${+percent * 2}px`;
    } else {
      percentFilledList.forEach(
        (el) => (el.style.height = `${+percent * 2}px`)
      );
    }
  }, [percent]);

  return (
    <div
      className={`flex gap-x-6 ${percent === "finish" && "pr-[7px]"} ${
        percent !== "start" &&
        percent !== "finish" &&
        "relative right-[26.5%] translate-x-[-26.5%]"
      }`}
    >
      {images.length > 0 ? (
        <div className="flex gap-x-4">
          <div className="relative bottom-4">
            {images[2] !== undefined && (
              <Image
                width={74}
                height={98}
                src={"/images/" + images[2].key}
                alt="Update"
                className="h-[98px] absolute rotate-[-15deg] right-[40px] rounded-xl shadow-md"
              />
            )}
            {images[1] !== undefined && (
              <Image
                width={74}
                height={98}
                src={"/images/" + images[1].key}
                alt="Update"
                className="h-[98px] absolute top-[-6px] right-[20px] rounded-xl shadow-md"
              />
            )}
            <Image
              width={74}
              height={98}
              src={"/images/" + images[0].key}
              alt="Update"
              className="h-[98px] rotate-12  rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-body_xs text-grays-600 font-normal">
              {title}
            </span>
            <h5 className="text-base text-grays-1000 font-bold">{subtitle}</h5>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="flex flex-col items-center justify-center">
        <div
          className={`drop-shadow-lg flex justify-center items-center w-12 h-12 rounded-full ${
            (percent === "start" || percent === "finish") &&
            "bg-grays-900 text-grays-0"
          } flex items-center justify-center ${
            percent === "start" || percent === "finish"
              ? "border-2 border-grays-0"
              : "border-2 border-grays-50"
          }`}
        >
          {percent === "start" && (
            <Icon
              iconName="arrow"
              fill="none"
              stroke="white"
              width="16px"
              viewBox="0 0 16 13"
            />
          )}

          {percent !== "start" && percent !== "finish" && (
            <span className="text-xs flex justify-center items-center font-sans font-normal text-grays-500">
              {percent + "%"}
            </span>
          )}
        </div>
        <div
          className={`w-2.5 bg-grays-50 h-[200px] ${
            percent === "finish" && "hidden"
          }`}
        >
          {allowLine && (
            <div
              className={`border h-[0px] w-full bg-grays-1000 percent-filled transition-ease-in-out duration-[4000ms]`}
            ></div>
          )}
        </div>
      </div>
      {(percent === "start" || percent === "finish") && (
        <div className="flex flex-col">
          <span className="text-body_xs text-grays-600 font-normal">
            {title}
          </span>
          <h5 className="text-base text-grays-1000 font-bold">{subtitle}</h5>
        </div>
      )}
    </div>
  );
};

const Timeline = ({ images }: DevelopmentOverviewProps) => {
  return (
    <>
      <div className="relative bg-gray-50 pt-4">
        <div className="flex flex-col  items-end">
          <TimelineItem
            title="Construction Start"
            subtitle="Already Started"
            images={[]}
            allowLine={true}
            percent={"start"}
          />
          <TimelineItem
            title="Update Added"
            subtitle="February 2024"
            percent={`${mockPercent}`}
            allowLine={mockPercent > 50 ? true : false}
            images={images}
          />
          <TimelineItem
            title="Estimated Finish"
            subtitle="February 2025"
            images={[]}
            percent={"finish"}
          />
        </div>
      </div>

      {/* <div
				className="bg-grays-100 flex justfy-center h-fit w-full absolute left-[0px] top-[0px]"
				style={{ display: "flex", width: "100%", justifyContent: "center" }}
			>
				<div className="w-2.5 bg-grays-600 h-[200px] "></div>
			</div> */}
    </>
  );
};
