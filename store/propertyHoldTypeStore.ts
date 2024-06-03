import { create } from "zustand";

type PropertyHoldType = "leasehold" | "freehold";

interface PropertyHoldTypeState {
  selectedPropertyHoldType: PropertyHoldType;
  setSelectedPropertyHoldType: (type: PropertyHoldType) => void;
}

const usePropertyHoldTypeStore = create<PropertyHoldTypeState>((set) => ({
  selectedPropertyHoldType: "leasehold",
  setSelectedPropertyHoldType: (type) =>
    set({ selectedPropertyHoldType: type }),
}));

export default usePropertyHoldTypeStore;
