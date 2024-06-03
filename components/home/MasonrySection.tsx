"use client";
import landListings from "@/mock/landListingMock";
import TheButton from "../ui/TheButton";
import { text } from "@/const/text";
import MasonryItem from "./MasonryItem";
import Container from "../container/Container";
import InfiniteScroller from "../ui/InfiniteScroller";
import propertyListings from "@/mock/propertyListingMock";
import { useState } from "react";

const MasonrySection = () => {
  const language = "en";
  const [isPaused, setIsPaused] = useState(false);

  return (
    <Container restClasses="bg-beiges-600">
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-2 xl:gap-8 lg:overflow-hidden lg:max-h-[650px]">
        <div className="lg:flex-[30%] xl:flex-[40%] 2xl:flex-1 py-11 pb-0 lg:py-32 xl:py-[189px] flex flex-col gap-8">
          <div className="flex flex-col gap-4 items-center lg:items-start">
            <h3 className="text-center lg:text-start heading_h3 lg:heading_h2 text-grays-900">
              {text.masonrySection.title[language]}
            </h3>
            <h4 className="text-center lg:text-start heading_h3 lg:heading_h2 text-grays-500">
              {text.masonrySection.subtitle[language]}
            </h4>
            <p className="text-center max-w-[500px] lg:-max-w-none lg:text-start body_s text-grays-700">
              {text.masonrySection.description[language]}
            </p>
          </div>
          <TheButton className="w-fit self-center lg:self-auto">
            {text.masonrySection.actionButton[language]}
          </TheButton>
        </div>
        <div
          
          className="scrolling_container flex lg:flex-[70%] xl:flex-[60%] 2xl:flex-1 flex-row gap-4 justify-center -mx-5 lg:mx-0 overflow-hidden max-h-[428px] lg:max-h-none lg:max-w-[584px] lg:justify-between"
        >
          <InfiniteScroller
            isPaused={isPaused}
            direction="up"
            listLength={landListings.length / 2}
          >
            <ul className="flex-1 flex flex-col gap-4 lg:gap-6 lg:items-center lg:max-w-[280px] lg:min-w-[280px]">
              {propertyListings
                .filter((el, i) => i % 2 === 0)
                .map((item, i) => (
                  <MasonryItem key={item.id} item={item} i={i} />
                ))}
            </ul>
          </InfiniteScroller>
          <InfiniteScroller
            isPaused={isPaused}
            direction="down"
            listLength={landListings.length / 2}
          >
            <ul className="flex-1 flex flex-col gap-4 lg:gap-6 lg:items-center lg:max-w-[280px] lg:min-w-[280px]">
              {propertyListings
                .filter((el, i) => i % 2 !== 0)
                .map((item, i) => (
                  <MasonryItem key={item.id} item={item} i={i} />
                ))}
            </ul>
          </InfiniteScroller>
        </div>
      </div>
    </Container>
  );
};

export default MasonrySection;
