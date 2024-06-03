interface CreateListingReq {
  title: string;
  propertyType:
    | "VILLA"
    | "APARTMENT"
    | "COMMERCIAL"
    | "LAND"
    | "VILLA_COMPLEX"
    | "APARTMENT_COMPLEX"
    | "COMMERCIAL_COMPLEX";
  description: string;
  leaseDuration?: number;
  leaseExpiration?: string;
  extensionGuaranteed?: boolean;
  youtubeLink?: string;
  listingType: "SALE" | "RENT";
  allowComments?: boolean;
  leasehold?: boolean;
  freehold?: boolean;
  monthlyRent?: boolean;
  yearlyRent?: boolean;
  landZoning?: "GREEN" | "YELLOW" | "ORANGE" | "PINK" | "RED";
  locationType: "EXACT" | "GENERAL";
  latitude?: string;
  longitude?: string;
  status: "ACTIVE" | "DRAFT" | "EXPIRED";
  showROI?: boolean;
  properties?: CreatePropertiesReq[];
  images?: CreateImageReq[];
  construction?: CreateConstructionReq;
  revenues?: CreateRevenueReq[];
  additionalDetails?: Array<
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
    | "HIGH_SPEED_INTERNET"
  >;
}

interface CreatePropertiesReq {
  propertyType:
    | "VILLA"
    | "APARTMENT"
    | "COMMERCIAL"
    | "LAND"
    | "VILLA_COMPLEX"
    | "APARTMENT_COMPLEX"
    | "COMMERCIAL_COMPLEX";
  landSize?: number;
  minimumTake?: number;
  buildArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  poolSize?: number;
  poolType?: "PRIVATE" | "SHARED";
  livingType?: "ENCLOSED" | "OPEN";
  available?: number;
  sold?: number;
  equipment?:
    | "FULLY_EQUIPPED"
    | "FURNISHED"
    | "SEMI_FURNISHED"
    | "UNFURNISHED"
    | "UNFINISHED_CONSTRUCTION";
  listPlots?: boolean;
  plots?: CreatePlotReq[];
  prices?: CreatePriceReq[];
  images?: CreateImageReq[];
}

interface CreatePlotReq {
  pricing?: "FLAT" | "VARIABLE";
  prices?: CreatePriceReq[];
  size?: number;
  status?: "SOLD" | "ACTIVE";
}

interface CreatePriceReq {
  leaseholdPrice?: number;
  freeholdPrice?: number;
  yearlyPrice?: number;
  monthlyPrice?: number;
  currency?: "EUR" | "USD" | "IDR" | "AUD" | "GBP";
}

interface CreateImageReq {
  place?: number;
  key?: string;
  year?: number;
  month?:
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
  thumbnail?: boolean;
}

interface CreateConstructionReq {
  status?: "OFF_PLAN" | "COMPLETED" | "UNFINISHED_CONSTRUCTION";
  completionYear?: number;
  compleationMonth?:
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
  startYear?: number;
  startMonth?:
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
}

interface CreateRevenueReq {
  roiType?: "PESSIMISTIC" | "REALISTIC" | "OPTIMISTIC";
  annualRevenue?: number;
  occupancy?: string;
  nightlyRate?: number;
  monthlyExpenses?: number;
  otaFees?: string;
  serviceFees?: string;
  roi?: string;
  passiveIn30Years?: number;
  annualProfit?: number;
  yearsToBreakEven?: string;
  currency?: "EUR" | "USD" | "IDR" | "AUD" | "GBP";
}
