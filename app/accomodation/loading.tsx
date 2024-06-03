import Container from "@/components/container/Container";
import Header from "@/components/layout/Header";
import Icon from "@/components/ui/Icon";
import TheButton from "@/components/ui/TheButton";
import SkeletonItem from "@/components/ui/skeletons/SkeletonItem";
import SkeletonMap from "@/components/ui/skeletons/SkeletonMap";
import SkeletonSearch from "@/components/ui/skeletons/SkeletonSearch";
import { text } from "@/const/text";
import React from "react";

const Loading = () => {
  const skeletonItems = Array.from({ length: 6 }, (el, i) => (
    <SkeletonItem key={i} />
  ));
  const language = "en";

  return (
    <>
      <div className="flex relative bg-beiges-600">
        <Container restClasses="z-[3]">
          <div className="flex flex-col gap-11 pt-4 lg:pt-[138px] pb-[44px] lg:pb-[42px] z-[2] w-full">
            <div className="flex flex-col max-w-[700px] w-full gap-6">
              <h1 className="heading_h3 lg:heading_h1">
                {text.heroSection.accomodationTitle[language]}
              </h1>
              <p className="body_s lg:body_m text-grays-700">
                {text.heroSection.desc[language]}
              </p>
            </div>
            <SkeletonSearch />
          </div>
        </Container>
        <SkeletonMap />
      </div>
      <Container>
        <div className="flex flex-col py-11 lg:py-20 gap-6 lg:gap-11">
          <div className="flex justify-between items-center">
            <h2 className="heading_h6 lg:heading_h3">
              {text.listingSection.title
                .map((el, i) => {
                  if (i === 0) {
                    return `${el[language]} 3256 `;
                  } else if (i === 1) {
                    return `${el[language]} 46 `;
                  } else {
                    return el[language];
                  }
                })
                .join("")}
            </h2>
            <TheButton variant="info" className="px-[1.125rem]">
              <Icon iconName="filter" hover />
              <span className="hidden lg:block">
                {text.listingSection.filterButton[language]}
              </span>
            </TheButton>
          </div>
          <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1320px]">
            {skeletonItems.map((el, i) => (
              <React.Fragment key={i}>{el}</React.Fragment>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Loading;
