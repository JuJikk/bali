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
  propertyType: PropertyType;
};

export type PropertyType =
  | "VILLA"
  | "APARTMENT"
  | "COMMERCIAL"
  | "LAND"
  | "VILLA_COMPLEX"
  | "APARTMENT_COMPLEX"
  | "COMMERCIAL_COMPLEX";

export type PropertyDetails = {
  id: number;
  listingId: number;
  propertyType: PropertyType;
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
  propertiesId: number;
  constructionId: number;
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
