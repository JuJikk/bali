import { create } from "zustand";

interface HeaderState {
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
}

const useHeaderStore = create<HeaderState>((set) => ({
  headerHeight: 0,
  setHeaderHeight: (height: number) => set({ headerHeight: height }),
}));

export default useHeaderStore;
