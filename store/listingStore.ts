import { Listing } from "@/models/basic";
import { create } from "zustand";

interface ListingStoreState {
  listings: Record<number, Listing>;
}

interface ListingStoreActions {
  setListing: (id: number, data: Listing) => void;
}

type ListingStore = ListingStoreState & ListingStoreActions;

const useListingStore = create<ListingStore>((set) => ({
  listings: {},

  setListing: (id: number, data: Listing) =>
    set((state) => ({
      listings: {
        ...state.listings,
        [id]: data,
      },
    })),
}));

export default useListingStore;
