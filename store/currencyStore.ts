import { create } from "zustand";

export type AvailableCurrencies = "USD" | "AUD" | "EUR" | "IDR" | "GBP"

export type CurrencyItem = {
  name: AvailableCurrencies;
  shortName: "$" | "A$" | "€" | "Rp" | "£";
  icon?: string;
};

interface CurrencyStore {
  currentCurrency: CurrencyItem;
  supportedCurrencies: CurrencyItem[];
  setCurrency: (currency: CurrencyItem) => void;
}

const defaultCurrencies: CurrencyItem[] = [
  { name: "USD", shortName: "$" },
  { name: "AUD", shortName: "A$" },
  { name: "EUR", shortName: "€" },
  { name: "IDR", shortName: "Rp" },
  { name: "GBP", shortName: "£" },
];

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  currentCurrency: defaultCurrencies[0],
  supportedCurrencies: defaultCurrencies,
  setCurrency: (currency: CurrencyItem) => set({ currentCurrency: currency }),
}));
