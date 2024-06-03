export type PropertyListing = {
  id: string;
  status?: number;
  title: string;
  price: number;
  currency: string;
  leasehold: boolean;
  leaseholdPrice?: number;
  freehold: boolean;
  freeholdPrice?: number;
  areaInAres: number;
  location: string;
  description: string;
  imageUrl: string[];
  addedDate: string;
  updatedDate: string;
  ownerImgUrl?: string;
  owner: string;
  area?: string;
  bedroomNumber: number;
  soldNumber?: number;
  constructionProgress?: number;
  sold?: boolean;
  propertyType: "VILLAS" | "APPARTMENTS" | "COMMERCIAL";
  longitude: number;
  latitude: number;
};

export type PlaceNearby = {
  name: string;
  distance: number;
}

export type PropertySingleListing = PropertyListing & {
  plot: number;
  bathrooms: number;
  buildingSize: number;
  poolSize: number;
  fullDescription: string;
  placesNearby: PlaceNearby[];
  features: string[];
}

export type PagePropertyListings = {
  items: PropertyListing[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type GetImageUrlResponse = {
  imageUrl: string;
};

export enum Currency {
  EUR = "EUR",
  USD = "$",
  IDR = "IDR",
  AUD = "AUD",
  GBP = "GBP",
}

export enum Month {
  JANUARY = "JANUARY",
  FEBRUARY = "FEBRUARY",
  MARCH = "MARCH",
  APRIL = "APRIL",
  MAY = "MAY",
  JUNE = "JUNE",
  JULY = "JULY",
  AUGUST = "AUGUST",
  SEPTEMBER = "SEPTEMBER",
  OCTOBER = "OCTOBER",
  NOVEMBER = "NOVEMBER",
  DECEMBER = "DECEMBER",
}
