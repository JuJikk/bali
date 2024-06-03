import { create } from "zustand";

interface HoverStore {
  hoveredItemId: number | null;
  setHoveredItemId: (id: number | null) => void;
}

const useHoverStore = create<HoverStore>((set) => ({
  hoveredItemId: null,
  setHoveredItemId: (id) => set({ hoveredItemId: id }),
}));

export default useHoverStore;
