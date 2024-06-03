"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import MapboxMap from "@/components/MapBox/MapboxMap";
import ListingSection from "@/components/home/ListingSection";
import TheButton from "@/components/ui/TheButton";
import Icon from "@/components/ui/Icon";
import {
  LandDetailsList,
  LandListings,
  PropertiesDetailsList,
  PropertiesListings,
} from "@/models/basic";
import useHeaderStore from "@/store/headerStore";
import SkeletonInteractiveMap from "../ui/skeletons/SkeletonInteractiveMap";
import useFilterStore from "@/store/filterStore";
import { getLandDetailsFilter, getPropertiesDetailsFilter } from "@/utils/api";
import { usePathname } from "next/navigation";

type ListingsProps = {
  propertiesDetails?: PropertiesDetailsList;
  landDetails?: LandDetailsList;
};

const Listings: FC<ListingsProps> = ({
                                       propertiesDetails = [],
                                       landDetails = [],
                                     }) => {
  const [showProperties, setShowProperties] = useState(true);
  const [isMapLoadingMap, setIsMapLoading] = useState(true);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [fullWidth, setFullWidth] = useState(false);
  const [listingSectionMarginTop, setListingSectionMarginTop] = useState(0);
  const [showViewMapButton, setShowViewMapButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [clientReady, setClientReady] = useState(false);
  const headerHeight = useHeaderStore((state) => state.headerHeight);
  const listingRef = useRef<HTMLDivElement>(null);
  const { properties, filters, lands, setFilters } = useFilterStore();
  const [isLoading, setIsloading] = useState(false);
  const [isNoListingFound, setIsNoListingFound] = useState(false);
  const pathname = usePathname();

  const [propertyDetailsState, setPropertyDetailsState] =
      useState<PropertiesDetailsList>([]);
  const [landDetailsState, setLandDetailsState] = useState<LandDetailsList>([]);

  const fetchPropertyFilter = async () => {
    const propertyDataContent: PropertiesListings[] = [...properties.content];
    const propertyDetailFilter = await getPropertiesDetailsFilter(
        propertyDataContent
    );

    setPropertyDetailsState(propertyDetailFilter);
    setIsloading(false);
  };

  const fetchLandFilter = async () => {
    const landDataContent: LandListings[] = [...lands.content];

    const landDetails = await getLandDetailsFilter(landDataContent);

    setLandDetailsState(landDetails);
    setIsloading(false);
  };

  useEffect(() => {
    if (
        pathname.split("/")[2]
            ? pathname.split("/")[1].toLowerCase() === "land"
            : !pathname.startsWith("/listings")
    ) {
      setShowProperties(false);
    } else {
      setShowProperties(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (properties.content.length !== 0 && lands.content.length !== 0) {
      setIsloading(true);
      setIsNoListingFound(false);
      if (propertiesDetails) {
        fetchPropertyFilter();
      }
      if (landDetails) {
        fetchLandFilter();
      }
    } else {
      if (Object.keys(filters).length > 0) {
        setIsNoListingFound(true);
      }
    }
  }, [properties, propertiesDetails, lands, landDetails, filters]);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const toggleBodyScroll = (enable: boolean) => {
    if (clientReady) {
      document.body.style.overflow = enable ? "auto" : "hidden";
    }
  };

  const handleShowAllListings = () => {
    setFilters({});
    setIsNoListingFound(false);
    setPropertyDetailsState(propertiesDetails);
    setLandDetailsState(landDetails);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1024);
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleHover = (id: number) => {
    setHoveredItemId(id);
  };

  const toggleMapVisibility = () => setShowMap((prev) => !prev);
  const toggleMapSize = () => setFullWidth((prev) => !prev);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkScroll = () => {
        if (window.scrollY < 100) {
          setShowViewMapButton(false);
        } else {
          setShowViewMapButton(true);
        }
      };
      window.addEventListener("scroll", checkScroll);

      return () => window.removeEventListener("scroll", checkScroll);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && isMobile) {
      const checkScrollPosition = () => {
        const scrollPosition = window.scrollY;
        const headerVisible = scrollPosition === 0;
        document.body.style.overflow = headerVisible ? "hidden" : "auto";
      };

      window.addEventListener("scroll", checkScrollPosition);

      return () => {
        window.removeEventListener("scroll", checkScrollPosition);
      };
    }
  }, [isMobile]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setListingSectionMarginTop(window.innerHeight - headerHeight - 78);
    }
  }, [isMapLoadingMap, headerHeight]);

  useEffect(() => {
    if (typeof window !== "undefined" && isMobile) {
      toggleBodyScroll(false);
      return () => toggleBodyScroll(true);
    }
    // eslint-disable-next-line
  }, [isMobile]);

  const scrollToTop = () => {
    window.scrollTo({
      top: window.innerHeight - headerHeight - 55,
      behavior: "smooth",
    });
    toggleBodyScroll(true);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
      <div
          className={`grid ${
              fullWidth || !showMap
                  ? "grid-cols-1"
                  : "grid-cols-1 lg:grid-cols-[60%_40%]"
          } gap-0 lg:gap-6 ${
              fullWidth
                  ? "-ml-20 -mr-20"
                  : !showMap
                      ? "-ml-10 -mr-10"
                      : "-ml-5 -mr-5 lg:-ml-10 lg:-mr-14"
          }`}
      >
        {showViewMapButton && (
            <TheButton
                variant="tertiary"
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[11] lg:hidden shadow-user-menu"
                onClick={scrollToBottom}
            >
              View Map
            </TheButton>
        )}
        {!fullWidth && (
            <div className="overflow-auto hidden lg:block">
              <ListingSection
                  contentDetails={
                    showProperties
                        ? propertyDetailsState.length === 0
                            ? propertiesDetails
                            : propertyDetailsState
                        : landDetailsState.length === 0
                            ? landDetails
                            : landDetailsState
                  }
                  columnsCount={showMap ? 2 : 3}
                  headingType="small"
                  insetY="small"
                  onHover={handleHover}
                  onLeave={() => setHoveredItemId(null)}
                  showMap={showMap}
                  toggleMapVisibility={toggleMapVisibility}
                  isLoading={isLoading}
                  noListings={isNoListingFound}
                  handleShowAllListings={handleShowAllListings}
              />
            </div>
        )}
        {isMapLoadingMap && <SkeletonInteractiveMap />}
        {showMap && clientReady && (
            <div
                className={`h-[calc(100vh-234px)] min-h-[600px] lg:h-[calc(100vh-92px)]  ${
                    fullWidth ? "relative" : `fixed w-full lg:sticky`
                }`}
                style={{ top: isMobile ? headerHeight : 0 + "px" }}
            >
              <MapboxMap
                  onLoaded={() => setIsMapLoading(false)}
                  propertyItems={
                    isNoListingFound
                        ? []
                        : propertyDetailsState.length === 0
                            ? propertiesDetails
                            : propertyDetailsState
                  }
                  landItems={
                    isNoListingFound
                        ? []
                        : landDetailsState.length === 0
                            ? landDetails
                            : landDetailsState
                  }
                  hoveredItemId={hoveredItemId}
                  fullWidth={fullWidth}
              />
              <TheButton
                  variant="tertiary"
                  className="hidden lg:flex absolute z-20 top-4 left-4 !p-4"
                  onClick={toggleMapSize}
              >
                {fullWidth ? (
                    <>
                <span className="rotate-[270deg]">
                  <Icon iconName="arrow" viewBox="0 0 16 16" />
                </span>
                      Show Listings
                    </>
                ) : (
                    <span className="rotate-90">
                <Icon iconName="arrow" viewBox="0 0 16 16" />
              </span>
                )}
              </TheButton>
              {!fullWidth && (
                  <TheButton
                      variant="tertiary"
                      className="hidden lg:block absolute z-20 bottom-4 right-4"
                      onClick={toggleMapVisibility}
                  >
                    Close Map
                  </TheButton>
              )}
            </div>
        )}
        {clientReady && !isLoading && (
            <div
                className={`overflow-auto block lg:hidden bg-grays-0 lg:relative z-10 px-5 lg:px-0 rounded-t-2xl`}
                style={{ marginTop: listingSectionMarginTop + "px" }}
                ref={listingRef}
                onClick={scrollToTop}
            >
              <div className="flex items-center justify-center pt-4 -mb-3">
                <div className="w-[50px] h-[5px] bg-grays-50 rounded-[100px]"></div>
              </div>
              <ListingSection
                  contentDetails={
                    showProperties
                        ? propertyDetailsState.length === 0
                            ? propertiesDetails
                            : propertyDetailsState
                        : landDetailsState.length === 0
                            ? landDetails
                            : landDetailsState
                  }
                  columnsCount={showMap ? 2 : 3}
                  headingType="small"
                  insetY="small"
                  onHover={handleHover}
                  onLeave={() => setHoveredItemId(null)}
                  showMap={showMap}
                  toggleMapVisibility={toggleMapVisibility}
                  isLoading={isLoading}
                  noListings={isNoListingFound}
                  handleShowAllListings={handleShowAllListings}
              />
            </div>
        )}
      </div>
  );
};

export default Listings;
