import { Equipment } from "@/models/basic";

export const propertyTypes = ["Villas", "Apartments", "Commercial"] as const;
export const landType = ["Land"];
export const ownershipTypes = ["Leasehold", "Freehold"] as const;
export const rentalTermOptions = ["Yearly", "Monthly"] as const;
export const bedroomsNumbers = ["1", "2", "3", "4", "5", "6"];
export const leasePeriods = [
  {
    value: "Any period (default)",
    label: "Any period (default)",
  },
  {
    value: "10",
    label: "10",
  },
  {
    value: "15",
    label: "15",
  },
  {
    value: "20",
    label: "20",
  },
  {
    value: "25",
    label: "25",
  },
  {
    value: "30",
    label: "30",
  },
];
type equipmentOption = {
  value: Equipment;
  label:
    | "Fully Equiped"
    | "Furnished"
    | "Semi-Furnished"
    | "Unfurnished"
    | "Unfinished construction";
};
export const equipmentOptions: equipmentOption[] = [
  { value: "FULLY_EQUIPPED", label: "Fully Equiped" },
  { value: "FURNISHED", label: "Furnished" },
  { value: "SEMI_FURNISHED", label: "Semi-Furnished" },
  { value: "UNFURNISHED", label: "Unfurnished" },
  { value: "UNFINISHED_CONSTRUCTION", label: "Unfinished construction" },
];
