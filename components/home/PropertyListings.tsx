"use client";
import React, { FC, useEffect, useState } from "react";
import ListingSection from "@/components/home/ListingSection";
import { PropertiesDetailsList, PropertiesListings } from "@/models/basic";
import useFilterStore from "@/store/filterStore";
import { getPropertiesDetailsFilter } from "@/utils/api";
import { useSearchTermStore } from "@/store/searchTermStore";
import { findMatchingProperties } from "@/utils/searchUtils";
import useHoverStore from "@/store/hoverStore";

type ListingsProps = {
  propertiesDetails: PropertiesDetailsList;
};

const PropertyListings: FC<ListingsProps> = ({ propertiesDetails = [] }) => {
  const { setHoveredItemId } = useHoverStore();
  const { properties, filters, setFilters } = useFilterStore();
  const [isNoListingFound, setIsNoListingFound] = useState(false);
  const { searchTerm } = useSearchTermStore();
  const [propertyDetailsState, setPropertyDetailsState] =
    useState<PropertiesDetailsList>([]);

  const fetchPropertyFilter = async () => {
    const propertyDataContent: PropertiesListings[] = [...properties.content];
    const propertyDetailFilter = await getPropertiesDetailsFilter(
      propertyDataContent
    );

    setPropertyDetailsState(propertyDetailFilter);
  };

  const fetchImages = async (listingId: number) => {
    try {
      const response = await fetch(`/api/proxy?listingId=${listingId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  const handleHover = (id: number) => {
    setHoveredItemId(id);
  };

  const loadImages = async () => {
    const updatedDetails = await Promise.all(
      propertiesDetails.map(async (item) => {
        const images = await fetchImages(item.listingId);
        return { ...item, images };
      })
    );
    setPropertyDetailsState(updatedDetails);
  };

  useEffect(() => {
    if (properties.content.length !== 0) {
      setIsNoListingFound(false);
      if (propertiesDetails) {
        fetchPropertyFilter();
      }
    } else {
      if (Object.keys(filters).length > 0) {
        setIsNoListingFound(true);
      }
    }
  }, [properties, propertiesDetails, filters]);

  useEffect(() => {
    if (propertiesDetails.length > 0) {
      loadImages();
    }
  }, [propertiesDetails]);

  const handleShowAllListings = () => {
    setFilters({});
    setIsNoListingFound(false);
    setPropertyDetailsState(propertiesDetails);
  };

  useEffect(() => {
    return () => {
      handleShowAllListings();
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredProperties = findMatchingProperties(
        propertiesDetails,
        searchTerm
      );
      setPropertyDetailsState(filteredProperties);
    } else {
      setPropertyDetailsState(propertiesDetails);
    }
  }, [searchTerm, propertiesDetails]);

  return (
    <ListingSection
      contentDetails={
        propertyDetailsState.length === 0
          ? propertiesDetails
          : propertyDetailsState
      }
      noListings={isNoListingFound}
      handleShowAllListings={handleShowAllListings}
      onHover={handleHover}
      onLeave={() => setHoveredItemId(null)}
    />
  );
};

export default PropertyListings;
