import { create } from "zustand";
import {
  Construction,
  ImageRes,
  Listing,
  PropertyDetails,
} from "@/models/newListingModel";

type ListingData = Omit<
  Listing,
  "id" | "clientId" | "status" | "validUntil" | "createdAt" | "updatedAt"
> & {
  properties: PropertyDetails[];
  images: ImageRes[];
  construction: Construction;
  additionalDetails: string[];
};

type ListingStoreState = {
  listingData: ListingData;
  setListingData: (data: Partial<ListingData>) => void;
  resetListingData: () => void;
};

const useNewListingStore = create<ListingStoreState>((set) => ({
  listingData: {
    title: "",
    propertyType: "VILLA",
    description: "",
    leaseDuration: 0,
    leaseExpiration: "",
    extensionGuaranteed: false,
    youtubeLink: "",
    listingType: "SALE",
    allowComments: false,
    leasehold: false,
    freehold: false,
    monthlyRent: false,
    yearlyRent: false,
    landZoning: "GREEN",
    locationType: "EXACT",
    latitude: "",
    longitude: "",
    location: "",
    showROI: false,
    properties: [],
    images: [],
    construction: {
      id: 0,
      listingId: 0,
      status: "OFF_PLAN",
      completionYear: 0,
      compleationMonth: "JANUARY",
      startYear: 0,
      startMonth: "JANUARY",
      createdAt: "",
      updatedAt: "",
    },
    additionalDetails: [],
    stars: 0,
    priority: false,
    priorityUntil: "",
    starsUntil: "",
    validFor: 0,
  },
  setListingData: (data) =>
    set((state) => ({
      listingData: { ...state.listingData, ...data },
    })),
  resetListingData: () =>
    set({
      listingData: {
        title: "",
        propertyType: "VILLA",
        description: "",
        leaseDuration: 0,
        leaseExpiration: "",
        extensionGuaranteed: false,
        youtubeLink: "",
        listingType: "SALE",
        allowComments: false,
        leasehold: false,
        freehold: false,
        monthlyRent: false,
        yearlyRent: false,
        landZoning: "GREEN",
        locationType: "EXACT",
        latitude: "",
        longitude: "",
        location: "",
        showROI: false,
        properties: [],
        images: [],
        construction: {
          id: 0,
          listingId: 0,
          status: "OFF_PLAN",
          completionYear: 0,
          compleationMonth: "JANUARY",
          startYear: 0,
          startMonth: "JANUARY",
          createdAt: "",
          updatedAt: "",
        },
        additionalDetails: [],
        stars: 0,
        priority: false,
        priorityUntil: "",
        starsUntil: "",
        validFor: 0,
      },
    }),
}));

export default useNewListingStore;
