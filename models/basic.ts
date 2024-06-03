import { AvailableCurrencies } from "@/store/currencyStore";

export type Listing = {
  id: number;
  clientId: number;
  title: string;
  description: string;
  leaseDuration: number;
  leaseExpiration: string;
  extensionGuaranteed: boolean;
  youtubeLink: string;
  listingType: "SALE" | "RENT";
  allowComments: boolean;
  leasehold: boolean;
  freehold: boolean;
  monthlyRent: boolean;
  yearlyRent: boolean;
  landZoning: "GREEN" | "YELLOW" | "ORANGE" | "PINK" | "RED";
  locationType: "EXACT" | "GENERAL";
  latitude: string;
  longitude: string;
  location: string;
  status: "ACTIVE" | "DRAFT" | "EXPIRED";
  showROI: boolean;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
  stars: number;
  starsUntil: string;
  priority: boolean;
  priorityUntil: string;
  validFor: number;
  oneDayReminder: boolean;
  threeDaysReminder: boolean;
  userId: number;
};

export type Properties = {
  id: number;
  listingId: number;
  propertyType:
    | "VILLA"
    | "APARTMENT"
    | "COMMERCIAL"
    | "LAND"
    | "VILLA_COMPLEX"
    | "APARTMENT_COMPLEX"
    | "COMMERCIAL_COMPLEX";
  landSize: number;
  minimumTake: number;
  buildArea: number;
  bedrooms: number;
  bathrooms: number;
  poolSize: number;
  poolType: "PRIVATE" | "SHARED";
  livingType: "ENCLOSED" | "OPEN";
  available: number;
  sold: number;
  equipment: Equipment;
  listPlots: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Equipment =
  | "FULLY_EQUIPPED"
  | "FURNISHED"
  | "SEMI_FURNISHED"
  | "UNFURNISHED"
  | "UNFINISHED_CONSTRUCTION";

export type Revenue = {
  id: number;
  listingId: number;
  roiType: "PESSIMISTIC" | "REALISTIC" | "OPTIMISTIC";
  annualRevenue: number;
  occupancy: string;
  nightlyRate: number;
  monthlyExpenses: number;
  otaFees: string;
  serviceFees: string;
  roi: string;
  passiveIn30Years: number;
  annualProfit: number;
  yearsToBreakEven: string;
  currency: "EUR" | "USD" | "IDR" | "AUD" | "GBP";
  createdAt: string;
  updatedAt: string;
};

export type Plot = {
  id: number;
  propertiesId: number;
  status: "SOLD" | "ACTIVE";
  size: number;
  pricing: "FLAT" | "VARIABLE";
};

export type ImageRes = {
  id: number;
  listingId: number;
  propertiesId: number | null;
  constructionId: number | null;
  year: number;
  month:
    | "JANUARY"
    | "FEBRUARY"
    | "MARCH"
    | "APRIL"
    | "MAY"
    | "JUNE"
    | "JULY"
    | "AUGUST"
    | "SEPTEMBER"
    | "OCTOBER"
    | "NOVEMBER"
    | "DECEMBER";
  place: number;
  key: string;
  thumbnail: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Construction = {
  id: number;
  listingId: number;
  status: "OFF_PLAN" | "COMPLETED" | "UNFINISHED_CONSTRUCTION";
  completionYear: number;
  compleationMonth:
    | "JANUARY"
    | "FEBRUARY"
    | "MARCH"
    | "APRIL"
    | "MAY"
    | "JUNE"
    | "JULY"
    | "AUGUST"
    | "SEPTEMBER"
    | "OCTOBER"
    | "NOVEMBER"
    | "DECEMBER";
  startYear: number;
  startMonth:
    | "JANUARY"
    | "FEBRUARY"
    | "MARCH"
    | "APRIL"
    | "MAY"
    | "JUNE"
    | "JULY"
    | "AUGUST"
    | "SEPTEMBER"
    | "OCTOBER"
    | "NOVEMBER"
    | "DECEMBER";
  createdAt: string;
  updatedAt: string;
};

export type UpdateImageReq = {
  id: number;
  key: string;
  year: number;
  month:
    | "JANUARY"
    | "FEBRUARY"
    | "MARCH"
    | "APRIL"
    | "MAY"
    | "JUNE"
    | "JULY"
    | "AUGUST"
    | "SEPTEMBER"
    | "OCTOBER"
    | "NOVEMBER"
    | "DECEMBER";
  place: number;
};

export type PageableObject = {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  sort: SortObject;
};

export type SortObject = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type PagePropertiesListings = {
  totalElements: number;
  totalPages: number;
  size: number;
  content: PropertiesListings[];
  number: number;
  sort: SortObject[];
  numberOfElements: number;
  pageable: PageableObject;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type PropertiesListings = {
  property: FilteredProperties;
  prices: Price[];
  owner: {
    name: string;
    image: string | null;
  };
  additionalDetails?: {
    id: number;
    listingId: number;
    feature: FeatureType;
  }[];
};

type FeatureType =
  | "OCEAN_VIEW"
  | "CLOSE_TO_BEACH"
  | "SUNSET_VIEW"
  | "SUNRISE_VIEW"
  | "PRIVATE_PARKING"
  | "OUTDOOR_SHOWER"
  | "TROPICAL_DESIGN"
  | "MODERN_DESIGN"
  | "MEDITERRANEAN_STYLE"
  | "TROPICAL_GARDEN"
  | "SUNKEN_SOFA"
  | "AIR_CONDITIONING"
  | "CCTV"
  | "INFINITY_POOL"
  | "ROOFTOP_TERRACE"
  | "JACUZZI_OR_HOT_TUB"
  | "OUTDOOR_KITCHEN_OR_BBQ_AREA"
  | "SMART_HOME"
  | "GYM"
  | "YOGA_SHALA"
  | "MASSAGE_ROOM"
  | "HIGH_SPEED_INTERNET";

export type FilteredProperties = {
  id: number;
  title: string;
  landSize: number;
  leaseExpiration: string | null;
  listingId: number;
  propertiesId: number;
  extensionGuaranteed: boolean;
  buildArea: number;
  clientId: number;
  thumbnailKey: string;
  location: string;
};

export type Price = {
  id: number;
  propertiesId: number;
  plotId: number;
  leaseholdPrice: number | null;
  freeholdPrice: number | null;
  yearlyPrice: number | null;
  monthlyPrice: number | null;
  currency: AvailableCurrencies;
  createdAt: string;
  updatedAt: string;
};

export type PageLandListings = {
  totalElements: number;
  totalPages: number;
  size: number;
  content: LandListings[];
  number: number;
  sort: SortObject[];
  numberOfElements: number;
  pageable: PageableObject;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type LandListings = {
  land: FilteredLands;
  prices: Price[];
  owner: {
    name: string;
    image: string | null;
  };
};

export type FilteredLands = {
  title: string;
  landSize: number;
  minimumTake: number;
  leaseExpiration: string;
  listingId: number;
  propertiesId: number;
  extensionGuaranteed: boolean;
  clientId: number;
  thumbnailKey: string;
};

export type LandListing = {
  id: number;
  clientId: number;
  title: string;
  description: string;
  leaseDuration: number;
  leaseExpiration: string;
  extensionGuaranteed: boolean;
  youtubeLink: string;
  listingType: "SALE" | "RENT";
  allowComments: boolean;
  leasehold: boolean;
  freehold: boolean;
  monthlyRent: boolean;
  yearlyRent: boolean;
  landZoning: "GREEN" | "YELLOW" | "ORANGE" | "PINK" | "RED";
  locationType: "EXACT" | "GENERAL";
  latitude: string;
  longitude: string;
  location: string;
  status: "ACTIVE" | "DRAFT" | "EXPIRED";
  showROI: boolean;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
  stars: number;
  starsUntil: string;
  priority: boolean;
  priorityUntil: string;
};

export type PropertiesDetails = {
  listingId: number;
  properties: Properties[];
  construction: Construction[];
  listing: Listing;
  images: ImageRes[];
  firstContent: PropertiesListings;
  revenue?: Revenue[];
};

export type PropertiesDetailsList = PropertiesDetails[];
export type LandDetails = {
  listingId: number;
  lands: LandListing[];
  construction: Construction[];
  listing: Listing;
  images: ImageRes[];
  firstContent: LandListings;
};

export type LandDetailsList = LandDetails[];

export type Language =
  | "English"
  | "Indonesian"
  | "French"
  | "German"
  | "Spanish";

export interface UserData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string | null;
  phone: string | null;
  phoneVerified: boolean;
}
