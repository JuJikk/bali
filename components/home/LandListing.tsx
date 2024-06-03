"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import ListingSection from "@/components/home/ListingSection";
import { LandDetailsList, LandListings } from "@/models/basic";
import useFilterStore from "@/store/filterStore";
import { getLandDetailsFilter } from "@/utils/api";
import useHoverStore from "@/store/hoverStore";

type ListingsProps = {
  landDetails: LandDetailsList;
};

const LandListing: FC<ListingsProps> = ({ landDetails = [] }) => {
  const { setHoveredItemId } = useHoverStore();

  const { filters, lands, setFilters } = useFilterStore();
  const [isNoListingFound, setIsNoListingFound] = useState(false);

  const [landDetailsState, setLandDetailsState] = useState<LandDetailsList>([]);

  const fetchLandFilter = async () => {
    const landDataContent: LandListings[] = [...lands.content];

    const landDetails = await getLandDetailsFilter(landDataContent);

    setLandDetailsState(landDetails);
  };

  const handleHover = (id: number) => {
    setHoveredItemId(id);
  };

  useEffect(() => {
    if (lands.content.length !== 0) {
      setIsNoListingFound(false);

      if (landDetails) {
        fetchLandFilter();
      }
    } else {
      if (Object.keys(filters).length > 0) {
        setIsNoListingFound(true);
      }
    }
  }, [lands, landDetails, filters]);

  const handleShowAllListings = () => {
    setFilters({});
    setIsNoListingFound(false);
    setLandDetailsState(landDetails);
  };

  useEffect(() => {
    return () => {
      handleShowAllListings();
    };
  }, []);

  return (
    <ListingSection
      contentDetails={
        landDetailsState.length === 0 ? landDetails : landDetailsState
      }
      noListings={isNoListingFound}
      handleShowAllListings={handleShowAllListings}
      onHover={handleHover}
      onLeave={() => setHoveredItemId(null)}
    />
  );
};

export default LandListing;
