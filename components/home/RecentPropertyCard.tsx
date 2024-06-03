import { RecentSearch } from "@/store/recentSearchesStore";
import Icon from "../ui/Icon";
import Link from "next/link";
import { useCurrencyStore } from "@/store/currencyStore";
import usePropertyHoldTypeStore from "@/store/propertyHoldTypeStore";
import { useEffect, useState } from "react";

type RecentPropertyCardProps = {
  el: RecentSearch;
};

const RecentPropertyCard: React.FC<RecentPropertyCardProps> = ({ el }) => {
  const { currentCurrency } = useCurrencyStore();
  const { selectedPropertyHoldType } = usePropertyHoldTypeStore();
  const [price, setPrice] = useState(0);

  const landPrice =
    el.prices?.find((price) => price.currency === currentCurrency.name)
      ?.monthlyPrice ?? 0;

  const selectedPropertyHoldTypeIndex =
    selectedPropertyHoldType === "freehold"
      ? "freeholdPrice"
      : "leaseholdPrice";

  useEffect(() => {
    setPrice(
      el.prices?.find((price) => price.currency === currentCurrency.name)?.[
        selectedPropertyHoldTypeIndex
      ] ?? 0
    );
  }, [selectedPropertyHoldTypeIndex, setPrice, currentCurrency, el]);

  return (
    <Link href={"/properties/" + el.itemId}>
      <div className="group flex gap-4 cursor-pointer">
        <div className="bg-grays-25 rounded-full p-3 h-fit">
          <Icon iconName="clock" width="20" fill="none" stroke="#292D32" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="body_s text-grays-1000 group-hover:text-grays-700">
            {el.title}
          </p>
          {el.bedroomsNumbers && (
            <p className="body_xs text-grays-600">
              {el.bedroomsNumbers} bedrooms
              {price ? "| " + currentCurrency.name + " " + price : ""}
            </p>
          )}
          {!el.bedroomsNumbers && (
            <p className="body_xs text-grays-600 group-hover:text-grays-500">
              {el.size} are
              {landPrice
                ? "| " + currentCurrency.name + " " + landPrice + "M / are"
                : ""}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecentPropertyCard;
