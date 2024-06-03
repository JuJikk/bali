import { create } from "zustand";
import { PageLandListings, PagePropertiesListings } from "@/models/basic";
import { Filters } from "@/components/layout/FilterModal";

interface FilterState {
  filters: Filters;
  properties: PagePropertiesListings;
  lands: PageLandListings;
  setFilters: (filters: Filters) => void;
  fetchFilteredProperties: (
    listingType: "sale" | "rent" | "land"
  ) => Promise<void>;
  setLands: (lands: PageLandListings) => void;
}

const initialProperties: PagePropertiesListings = {
  totalElements: 0,
  totalPages: 0,
  size: 0,
  content: [],
  number: 0,
  sort: [],
  numberOfElements: 0,
  pageable: {
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 0,
    paged: true,
    unpaged: false,
  },
  first: true,
  last: true,
  empty: true,
};

const initialLands: PageLandListings = {
  totalElements: 0,
  totalPages: 0,
  size: 0,
  content: [],
  number: 0,
  sort: [],
  numberOfElements: 0,
  pageable: {
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 0,
    paged: true,
    unpaged: false,
  },
  first: true,
  last: true,
  empty: true,
};

const useFilterStore = create<FilterState>((set, get) => ({
  filters: {},
  properties: initialProperties,
  lands: initialLands,
  setFilters: (filters) => set({ filters }),
  fetchFilteredProperties: async (listingType) => {
    const { filters } = get();
    try {
      const queryParams = new URLSearchParams(filters as any).toString();
      const response = await fetch(
        `/get/api/listings/public/${listingType}?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (listingType === "land") {
        set({ lands: data });
      } else {
        set({ properties: data });
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    }
  },
  setLands: (lands) => set({ lands }),
}));

export default useFilterStore;
