"use client";
import Icon from "../ui/Icon";
import TheButton from "../ui/TheButton";
import React, { useState } from "react";
import SkeletonItem from "../ui/skeletons/SkeletonItem";
import {
  LandDetails,
  LandDetailsList,
  PropertiesDetailsList,
} from "@/models/basic";
import { usePathname } from "next/navigation";
import { text } from "@/const/text";
import FilterModal from "../layout/FilterModal";
import { useLanguageStore } from "@/store/languageStore";
import LandListingCard from "./LandListingCard";
import ListingCard from "./ListingCard";

type TitlePart = {
  en: string;
};

type ListingSectionProps = {
  columnsCount?: number;
  headingType?: "small" | "big";
  insetY?: "small" | "big";
  onHover?: (id: number) => void;
  onLeave?: () => void;
  showMap?: boolean;
  toggleMapVisibility?: () => void;
  contentDetails: PropertiesDetailsList | LandDetailsList;
  isLoading?: boolean;
  noListings?: boolean;
  handleShowAllListings?: () => void;
};

const ListingSection: React.FC<ListingSectionProps> = ({
  columnsCount = 3,
  headingType = "big",
  insetY = "big",
  onHover = () => {},
  onLeave = () => {},
  showMap,
  toggleMapVisibility,
  contentDetails,
  isLoading,
  noListings,
  handleShowAllListings,
}) => {
  const pathname = usePathname();
  const agentsCount = 41;

  const { currentLanguage } = useLanguageStore();
  const language = currentLanguage.shortName.toLowerCase() ?? "en";
  const [period, setPeriod] = useState<"MONTHLY" | "YEARLY">("MONTHLY");

  const handlePeriodChange = (periodType: "MONTHLY" | "YEARLY") => {
    setPeriod(periodType);
  };

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const isListingPage =
    pathname === "/listings" || pathname.split("/")[2] === "listings";
  const isAccomodation = pathname.startsWith("/accomodation");

  const isLandListing = (listing: any): listing is LandDetails => {
    return (listing as LandDetails).lands !== undefined;
  };

  const sortedListings = [...contentDetails].sort((a, b) => {
    if (a.listing.priority && !b.listing.priority) {
      return -1;
    } else if (!a.listing.priority && b.listing.priority) {
      return 1;
    } else {
      return 0;
    }
  });

  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(true);
  };
  const handleFIlterModalClose = () => {
    setIsFilterModalOpen(false);
  };

  const skeletonItems = Array.from({ length: 6 }, (el, i) => (
    <SkeletonItem key={i} />
  ));

  const getTitle = (titleArray: TitlePart[]): string => {
    return titleArray
      .map((el: TitlePart, i) => {
        const key = language as keyof TitlePart;
        if (i === 0) {
          return `${el[key]} ${noListings ? 0 : contentDetails.length} `;
        } else if (i === 1) {
          return `${el[key]} ${agentsCount} `;
        } else {
          return el[key];
        }
      })
      .join("");
  };

  const title = getTitle(text.listingSection.title);

  const headingStyle =
    headingType === "small"
      ? "heading_h5 lg:heading_h5"
      : "heading_h6 lg:heading_h3";
  const containerPaddingY =
    insetY === "small"
      ? "py-6 lg:py-10  gap-6"
      : "py-11 lg:py-20 gap-6 lg:gap-11";

  return (
    <div className={`flex flex-col ${containerPaddingY}`}>
      <div
        className={`flex  items-center ${
          isListingPage
            ? "justify-center lg:justify-between"
            : "justify-between"
        }`}
      >
        <h2 className={headingStyle}>{title}</h2>
        <div
          className={`gap-3 flex ${
            isListingPage ? "hidden lg:flex" : "text-grays-600"
          }`}
        >
          {isAccomodation && (
            <div className="flex gap-6 mr-5">
              <button
                className={`body_m ${
                  period === "MONTHLY" ? "text-grays-1000" : ""
                }`}
                onClick={() => handlePeriodChange("MONTHLY")}
              >
                MONTHLY
              </button>
              <button
                className={`body_m ${
                  period === "YEARLY" ? "text-grays-1000" : ""
                }`}
                onClick={() => handlePeriodChange("YEARLY")}
              >
                YEARLY
              </button>
            </div>
          )}
          {!showMap && !isListingPage ? (
            <TheButton
              variant="info"
              className="px-[1.125rem]"
              onClick={handleFilterModalOpen}
            >
              <Icon iconName="filter" hover />
              <span className="hidden lg:block">
                {text.listingSection.filterButton[language as keyof TitlePart]}
              </span>
            </TheButton>
          ) : (
            <TheButton
              variant="secondary"
              className="px-[1.125rem] border-grays-50 body_xs"
            >
              <span className="hidden lg:block">Popular</span>
              <Icon iconName="arrow" hover viewBox="0 0 16 16" width="16" />
            </TheButton>
          )}
          {!showMap && isListingPage && (
            <>
              <TheButton
                variant="tertiary"
                className="px-0"
                onClick={toggleMapVisibility}
              >
                <span className="underline body_xs">Show Map</span>
              </TheButton>
            </>
          )}
        </div>
        {isFilterModalOpen && (
          <FilterModal closeModal={handleFIlterModalClose} />
        )}
      </div>
      {noListings && !isLoading && (
        <div className="w-full flex flex-col gap-6">
          <div className="p-6 flex flex-col gap-1 bg-grays-25 rounded-2xl">
            <h4 className="heading_h4">No Listings Found</h4>
            <p className="body_s">
              Please Adjust Your Filters or Explore All Listings
            </p>
          </div>
          <TheButton onClick={handleShowAllListings}>
            Show all Listings
          </TheButton>
        </div>
      )}
      {!noListings && (
        <div
          className={`grid gap-6 max-w-[1360px] ${
            columnsCount === 3 ? "three_columns" : "two_columns"
          }`}
        >
          {!sortedListings || isLoading
            ? skeletonItems.map((el, i) => (
                <React.Fragment key={i}>{el}</React.Fragment>
              ))
            : sortedListings.map((item) =>
                isLandListing(item) ? (
                  <LandListingCard
                    key={item.listingId}
                    item={item}
                    onHover={onHover}
                    onLeave={onLeave}
                  />
                ) : (
                  <ListingCard
                    key={item.listingId}
                    item={item}
                    onHover={onHover}
                    onLeave={onLeave}
                    isAccomodation={isAccomodation}
                    period={period}
                  />
                )
              )}
        </div>
      )}
      {/* <pre className="fixed z-50 bg-grays-0 left-0 top-0 rounded-xl max-w-[400px] h-full overflow-auto p-4">
        {JSON.stringify(sortedListings[7], null, 2)}
      </pre> */}
    </div>
  );
};

export default ListingSection;
