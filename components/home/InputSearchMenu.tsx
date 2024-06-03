import React from "react";
import Icon from "../ui/Icon";
import { Price, PropertiesDetailsList } from "@/models/basic";
import { useRouter } from "next/navigation";
import useRecentSearchesStore from "@/store/recentSearchesStore";
import { useCurrencyStore } from "@/store/currencyStore";
import usePropertyHoldTypeStore from "@/store/propertyHoldTypeStore";

type InputSearchMenuProps = {
  filteredProperties: PropertiesDetailsList;
};

const InputSearchMenu: React.FC<InputSearchMenuProps> = ({
  filteredProperties,
}) => {
  const addRecentSearch = useRecentSearchesStore(
    (state) => state.addRecentSearch
  );

  const router = useRouter();

  const handleClick = (
    itemId: string,
    title: string,
    prices: Price[],
    bedroomsNumbers?: number,
    size?: number
  ) => {
    const resetSearchItem = {
      itemId: itemId.toString(),
      title,
      prices,
      bedroomsNumbers,
      size,
    };
    addRecentSearch(resetSearchItem);
    router.push(`/properties/${itemId}`);
  };
  return (
    <ul className=" min-w-[256px] flex flex-col gap-6">
      {filteredProperties.slice(0, 3).map((el) => (
        <div
          key={el.listingId}
          className="flex gap-4 items-center cursor-pointer"
          onClick={() =>
            handleClick(
              el.listingId.toString(),
              el.listing.title,
              el.firstContent.prices,
              // el.property.bedrooms,
              // el.property.buildArea
            )
          }
        >
          <div className="bg-grays-25 rounded-full p-3 h-fit">
            <Icon iconName="map2" width="20" fill="none" stroke="#292D32" />
          </div>
          <p className="body_s">{el.listing.title}</p>
        </div>
      ))}
    </ul>
  );
};

export default InputSearchMenu;
