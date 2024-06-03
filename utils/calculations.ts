import { Construction, Price } from "@/models/basic";

function getMonthIndex(month: string): number {
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  return months.indexOf(month.toUpperCase());
}

export function calcProgress(el: Construction) {
  const startDate = new Date(el.startYear, getMonthIndex(el.startMonth));

  const finishDate = new Date(
    el.completionYear,
    getMonthIndex(el.compleationMonth ?? "DECEMBER")
  );
  const currentDate = new Date();
  const totalMonths =
    (finishDate.getFullYear() - startDate.getFullYear()) * 12 +
    (finishDate.getMonth() - startDate.getMonth());
  const elapsedMonths =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    (currentDate.getMonth() - startDate.getMonth());
  const progress = Math.min((elapsedMonths / totalMonths) * 100, 100);
  return progress;
}

type PriceType =
  | "freeholdPrice"
  | "leaseholdPrice"
  | "yearlyPrice"
  | "monthlyPrice";

export function formatPrices(
  prices: Price[],
  period: "MONTHLY" | "YEARLY" | undefined
) {
  const priceElement = prices.find((el) => el.currency === "IDR");

  if (!priceElement) {
    return {
      formattedPrice: "Price unavailable",
    };
  }

  const formatPrice = (price: number) => {
    if (price >= 100000000) {
      return `${(price / 1000000000).toFixed(2)} billion IDR`;
    } else if (price >= 100000) {
      return `${(price / 1000000).toFixed(2)} million IDR`;
    } else {
      return `${price} IDR`;
    }
  };

  const priceTypes: { key: PriceType; label: string }[] = [
    { key: "freeholdPrice", label: "Freehold Price" },
    { key: "leaseholdPrice", label: "Leasehold Price" },
    { key: "yearlyPrice", label: "Yearly Price" },
    { key: "monthlyPrice", label: "Monthly Price" },
  ];

  if (period) {
    const periodKey = period === "MONTHLY" ? "monthlyPrice" : "yearlyPrice";
    const periodLabel = period === "MONTHLY" ? "Monthly Price" : "Yearly Price";
    const periodPrice = priceElement[periodKey];

    if (periodPrice) {
      return {
        formattedPrice: formatPrice(periodPrice),
        priceType: periodLabel,
      };
    }
  }

  for (const { key, label } of priceTypes) {
    const price = priceElement[key];
    if (price) {
      return {
        formattedPrice: formatPrice(price),
        priceType: label,
      };
    }
  }

  return {
    formattedPrice: "Price unavailable",
  };
}

export const getPrice = (prices: Price[], currency: string) => {
  const priceObj = prices.find((el) => el.currency === currency);
  return (
    priceObj?.leaseholdPrice ??
    priceObj?.freeholdPrice ??
    priceObj?.yearlyPrice ??
    priceObj?.monthlyPrice ??
    0
  );
};
