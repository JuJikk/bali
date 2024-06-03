import { Language } from "@/models/basic";
import { create } from "zustand";

export type LanguageItem = {
  shortName: "EN" | "ID" | "FR" | "DE" | "ES";
  name: Language;
  icon: string;
};

interface LanguageStore {
  currentLanguage: LanguageItem;
  supportedLanguages: LanguageItem[];
  setLanguage: (language: LanguageItem) => void;
}

const defaultLanguages: LanguageItem[] = [
  {
    name: "English",
    shortName: "EN",
    icon: "/icons/flags/uk.svg",
  },
  {
    name: "Indonesian",
    shortName: "ID",
    icon: "/icons/flags/id.svg",
  },
  {
    name: "French",
    shortName: "FR",
    icon: "/icons/flags/fr.svg",
  },
  {
    name: "German",
    shortName: "DE",
    icon: "/icons/flags/de.svg",
  },
  {
    name: "Spanish",
    shortName: "ES",
    icon: "/icons/flags/es.svg",
  },
];

export const useLanguageStore = create<LanguageStore>((set) => ({
  currentLanguage: defaultLanguages[0],
  supportedLanguages: defaultLanguages,
  setLanguage: (language: LanguageItem) => set({ currentLanguage: language }),
}));
