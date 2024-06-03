"use client`";
import Image from "next/image";
import React, { useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Icon from "../ui/Icon";
import { ImageRes } from "@/models/basic";

type ImageSliderProps = {
  images: ImageRes[] | string[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const properties = {
    onChange: (oldIndex: number, newIndex: number) => {
      setCurrent(newIndex);
    },
    prevArrow: (
      <button
        style={{ display: current > 0 ? "flex" : "none" }}
        className="hover_arrow w-9 h-9 bg-grays-0 border-none p-2.5 rounded-full flex justify-center items-center ml-4 top-[110px] opacity-80 hover:!opacity-100 hover:scale-105"
      >
        <Icon iconName="arrow-left" fill="none" stroke="#292D32" />
      </button>
    ),
    nextArrow: (
      <button
        style={{
          display: current < images.length - 1 ? "flex" : "none",
        }}
        className="hover_arrow w-9 h-9 bg-grays-0 border-none p-2.5 rounded-full flex justify-center items-center mr-4 top-[110px] rotate-180 opacity-80 hover:!opacity-100 hover:scale-105"
      >
        <Icon iconName="arrow-left" fill="none" stroke="#292D32" />
      </button>
    ),
  };

  return (
    <div className="slide-container static w-screen-40 sm:w-full">
      <Slide
        {...properties}
        autoplay={false}
        transitionDuration={200}
        arrows={images.length > 1}
        indicators={images.length > 1}
        infinite={false}
        canSwipe
        slidesToShow={1}
        slidesToScroll={1}
      >
        {images.map((el, index) => {
          return (
            <div
              key={index}
              className="flex justify-center items-center overflow-hidden"
            >
              <Image
                src={`/images/${typeof el === "string" ? el : el.key}`}
                alt="land"
                width={410}
                height={220}
                className="object-cover object-center w-full h-full min-h-[220px]"
                draggable={false}
              />
            </div>
          );
        })}
      </Slide>
    </div>
  );
};

export default ImageSlider;
