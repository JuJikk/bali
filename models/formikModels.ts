import { Equipment } from "./basic";

export interface Price {
  leaseholdPrice: number;
  freeholdPrice: number;
  yearlyPrice: number;
  monthlyPrice: number;
  currency: "AUD" | "USD" | "GBP" | "IDR" | "EUR";
}

export interface Plot {
  pricing: "VARIABLE" | "FIXED";
  prices: Price[];
  size: number;
  status: "SOLD" | "ACTIVE";
}

export interface Image {
  place: number;
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
  thumbnail: boolean;
}

export interface Revenue {
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
  currency: "AUD" | "USD" | "GBP" | "IDR" | "EUR";
}

export interface FormValues {
  title: string;
  description: string;
  location: string;
  images: Image[];
  leaseDuration: number;
  leaseExpiration: string;
  extensionGuaranteed: boolean;
  youtubeLink: string;
  locationType: "EXACT" | "GENERAL";
  latitude: string;
  longitude: string;
}

export interface PropertyFormValues {
  propertyType: "COMMERCIAL" | "RESIDENTIAL";
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
  priceIdrLeasehold: number;
  plots: Plot[];
  prices: Price[];
  images: Image[];
  revenues: Revenue[];
}
