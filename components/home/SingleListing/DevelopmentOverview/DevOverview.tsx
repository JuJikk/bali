"use client";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { useEffect } from "react";
import { ImageRes } from "@/models/basic";
import Container from "@/components/container/Container";

type DevelopmentOverviewProps = {
  images: ImageRes[] | undefined;
};

type NodeOfProgressProps = {
  title: string;
  subtitle: string;
  typeOfNode: "start" | "middle" | "end";
  images?: ImageRes[] | undefined;
};

const mockPercent = 51;
const sublineHeight = 200;

const mockTimeline = [
  { title: "first", subtitle: "sub first", typeOfNode: "start" },
  { title: "second", subtitle: "sub second", typeOfNode: "middle" },
  { title: "third", subtitle: "sub third", typeOfNode: "end" },
];

const ImagesStack = ({ images = [] }: DevelopmentOverviewProps) => {
  return (
    <>
      {images.length > 0 && (
        <div className="lg:flex gap-x-4">
          <div className="relative bottom-4 w-[100px]">
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
            <span className="text-body_xs text-grays-600 font-normal whitespace-nowrap">
              title
            </span>
            <h5 className="text-base text-grays-1000 font-bold whitespace-nowrap">
              subtitle
            </h5>
            <a className="cursor-pointer text-body_xs text-grays-600 whitespace-nowrap font-normal underline">
              See Update
            </a>
          </div>
        </div>
      )}
    </>
  );
};

function DevOverview({ images }: DevelopmentOverviewProps) {
  const NodeOfProgress = ({
    title,
    subtitle,
    typeOfNode,
    images = [],
  }: NodeOfProgressProps) => {
    return (
      <div
        className={`z-10 relative flex h-[${
          typeOfNode !== "end" && sublineHeight
        }px] `}
      >
        <div
          className={`drop-shadow-lg bg-grays-0 flex justify-center items-center w-16 h-16 rounded-full  ${
            typeOfNode !== "middle" && "bg-grays-900 text-grays-0"
          } flex items-center justify-center ${
            typeOfNode !== "middle"
              ? "border-[4px] border-grays-0"
              : "border-[4px] border-grays-50"
          }`}
        >
          {typeOfNode === "start" && (
            <Icon
              iconName="arrow"
              fill="none"
              stroke="white"
              width="22px"
              viewBox="0 0 16 13"
            />
          )}

          {typeOfNode === "middle" && `${mockPercent}%`}
        </div>

        {typeOfNode === "middle" && (
          <div className="absolute lg:right-[100px] right-[80px]">
            <ImagesStack images={images} />
          </div>
        )}

        {typeOfNode !== "middle" && (
          <div className="absolute lg:left-[100px] left-[80px] flex flex-col w-[150px]">
            <div className="">{title}</div>
            <div className="font-bold">{subtitle}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Container restClasses="relative">
      <div className="w-full flex items-center justify-center text-grays-1000 flex-col gap-y-11 pt-8">
        <div>
          <h3 className="sm:block hidden text-h3 leading-h3 text-center font-bold">
            Development Overview
          </h3>
          <h3 className="sm:hidden text-4 leading-body_m text-center font-bold">
            Development Overview
          </h3>
        </div>

        <div className="relative flex  items-center  flex-col w-full pb-10 h-fit">
          {mockTimeline.map((el: any, index: number) => (
            <NodeOfProgress
              images={images}
              title={el.title}
              subtitle={el.subtitle}
              typeOfNode={el.typeOfNode}
              key={`NOP_${index}`}
            />
          ))}

          <div
            className="bg-grays-50"
            style={{
              top: "62px",
              position: "absolute",
              height: `${sublineHeight * (mockTimeline.length - 1) - 60}px`,
              width: "10px",
            }}
          >
            <div
              className={` h-[10%] rounded-full w-[10px] bg-grays-1000  overflow-hidden transition-height duration-500 h-[${mockPercent}px]`}
            ></div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DevOverview;
