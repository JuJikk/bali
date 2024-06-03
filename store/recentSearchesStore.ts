import { Price } from "@/models/basic";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export type RecentSearch = {
  itemId: string;
  title: string;
  bedroomsNumbers?: number;
  prices: Price[];
  size?: number;
};

type RecentSearchesState = {
  recentSearches: RecentSearch[];
  addRecentSearch: (search: RecentSearch) => void;
};

const useRecentSearchesStore = create<RecentSearchesState>()(
  devtools(
    persist(
      (set) => ({
        recentSearches: [],
        addRecentSearch: (search) =>
          set((state) => ({
            recentSearches: [
              search,
              ...state.recentSearches.filter((s) => s.itemId !== search.itemId),
            ],
          })),
      }),
      {
        name: "recent-searches",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default useRecentSearchesStore;
