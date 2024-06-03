"use client";
import Container from "@/components/container/Container";
import Icon from "@/components/ui/Icon";
import TheButton from "@/components/ui/TheButton";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import mapImage from "@/public/images/map.png";
import { text } from "@/const/text";
import HeroInput from "./HeroInput";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LandDetailsList, PropertiesDetailsList } from "@/models/basic";
import useRecentSearchesStore from "@/store/recentSearchesStore";
import usePropertyHoldTypeStore from "@/store/propertyHoldTypeStore";
import useFilterStore from "@/store/filterStore";
import { useSearchTermStore } from "@/store/searchTermStore";
import { useSession } from "next-auth/react";
import MapboxMap from "../MapBox/MapboxMap";
import useHoverStore from "@/store/hoverStore";

type HeroSectionProps = {
  propertiesDetails?: PropertiesDetailsList;
  landDetails?: LandDetailsList;
};

const HeroSection: FC<HeroSectionProps> = ({
  propertiesDetails,
  landDetails,
}) => {
  const language = "en";
  const { hoveredItemId } = useHoverStore();
  const [activeInputTabs, setActiveInputTabs] = useState<
    Array<{ iconName: string; en: string }>
  >(
    text.heroSection.inputTabs.filter(
      (el) => el.en === "Apartments" || el.en === "Villas"
    )
  );

  const pathname = usePathname();
  const [searchTerm, setSearchterm] = useState("");
  const { setSearchTerm } = useSearchTermStore();
  const [isMapLoadingMap, setIsMapLoading] = useState(true);

  const { selectedPropertyHoldType, setSelectedPropertyHoldType } =
    usePropertyHoldTypeStore();

  const handleTabClick = (tab: { iconName: string; en: string }) => {
    setActiveInputTabs((prevTabs) =>
      prevTabs.includes(tab)
        ? prevTabs.filter((activeTab) => activeTab !== tab)
        : [...prevTabs, tab]
    );
  };

  const handleSearch = () => {
    setSearchTerm(searchTerm);
  };

  const handleSetSearchterm = (searchTerm: string) => {
    setSearchterm(searchTerm);
  };

  const getPageTitle = () => {
    if (pathname === "/") {
      return "propertyTitle";
    } else if (pathname === "/land") {
      return "landTitle";
    } else if (pathname === "/accomodation") {
      return "accomodationTitle";
    } else return "propertyTitle";
  };

  const pageTitle = getPageTitle();

  return (
    <div className="flex relative bg-beiges-600">
      <Container>
        <div className="flex flex-col gap-11 pt-4 lg:pt-[138px] pb-[44px] lg:pb-[42px] z-[2] w-full">
          <div className="flex flex-col max-w-[700px] w-full gap-6">
            <h1 className="heading_h3 lg:heading_h1">
              {text.heroSection[pageTitle][language]}
            </h1>
            <p className="body_s lg:body_m text-grays-700">
              {text.heroSection.desc[language]}
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex">
              <button
                className={` heading_h6 px-7 lg:px-6 py-2  rounded-tl-2xl cursor-pointer ${
                  selectedPropertyHoldType === "leasehold"
                    ? "bg-grays-700 text-grays-0"
                    : "bg-grays-25 text-grays-900"
                }`}
                onClick={() => setSelectedPropertyHoldType("leasehold")}
              >
                {text.heroSection.tabs.first[language]}
              </button>
              <button
                className={` heading_h6 px-7 lg:px-6 py-2  rounded-tr-2xl cursor-pointer ${
                  selectedPropertyHoldType === "freehold"
                    ? "bg-grays-700 text-grays-0"
                    : "bg-grays-25 text-grays-900"
                }`}
                onClick={() => setSelectedPropertyHoldType("freehold")}
              >
                {text.heroSection.tabs.second[language]}
              </button>
            </div>
            <form
              action={handleSearch}
              className="bg-grays-0 lg:max-w-[807px] lg:w-full rounded-2xl p-[12px] lg:p-[22px] gap-6 flex flex-col z-10"
            >
              <div className="flex gap-3 relative">
                <HeroInput
                  className=""
                  placeholderClose={
                    text.heroSection.inputPlaceholderCLose[language]
                  }
                  placeholderOpen={
                    text.heroSection.inputPlaceholderOpen[language]
                  }
                  propertiesDetails={propertiesDetails}
                  handleSetSearchterm={handleSetSearchterm}
                />
                <TheButton type="submit" className="!px-[14px] lg:!hidden">
                  <Icon
                    iconName={text.heroSection.inputButton.iconname}
                    stroke="#ffffff"
                    fill="#ffffff"
                  />
                </TheButton>
                <TheButton type="submit" className="hidden lg:!flex">
                  {text.heroSection.inputButton[language]}
                </TheButton>
              </div>

              <ul className="flex gap-3 lg:gap-6 flex-wrap">
                {text.heroSection.inputTabs.map((tab) => (
                  <li key={tab[language]}>
                    <button
                      type="button"
                      className={`flex gap-1 lg:gap-1.5 items-center px-3 py-1.5 rounded-[100px] font-hk_medium text-[0.8125rem] leading-[19.5px] ${
                        activeInputTabs.includes(tab)
                          ? "text-grays-900 bg-grays-25"
                          : "text-grays-700"
                      }`}
                      onClick={() => handleTabClick(tab)}
                    >
                      <Icon
                        iconName={tab.iconName}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="#3C3E3D"
                      />
                      <span>{tab[language]}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </form>
          </div>
        </div>
      </Container>

      <div className="hidden lg:block absolute right-0 w-[45%] h-full rounded-l-[120px] overflow-hidden">
        {isMapLoadingMap && (
          <Image
            alt="map"
            src={mapImage}
            className="object-cover w-full h-full"
            priority
          />
        )}

        <MapboxMap
          onLoaded={() => setIsMapLoading(false)}
          propertyItems={propertiesDetails}
          landItems={landDetails}
          hoveredItemId={hoveredItemId}
        />
        <div className="absolute bottom-4 right-4 z-10">
          <Link href={pathname === "/" ? "/listings" : pathname + "/listings"}>
            <TheButton variant="tertiary">
              {text.heroSection.mapButton[language]}
            </TheButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
