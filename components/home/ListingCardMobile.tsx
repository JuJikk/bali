"use client";
import Image from "next/image";
import Icon from "../ui/Icon";
import { useCurrencyStore } from "@/store/currencyStore";
import { PropertiesDetails } from "@/models/basic";
import Link from "next/link";
import { formatPrices } from "@/utils/calculations";

type ListingCardServerMobileProps = {
  item: PropertiesDetails;
  isAccomodation?: boolean;
  period?: "MONTHLY" | "YEARLY";
};

const ListingCardMobile: React.FC<ListingCardServerMobileProps> = ({
  item,
  isAccomodation,
  period,
}) => {
  const { currentCurrency } = useCurrencyStore();

  const priceElement = item.firstContent.prices.find(
    (el) => el.currency === "IDR"
  );

  const prices = formatPrices(item.firstContent.prices, period);

  return (
    <div className="p-5">
      <Link href={"/properties/" + item.listingId} className="select-none">
        <div
          className={`flex flex-row gap-4 items-center relative cursor-pointer rounded-2xl h-fit bg-grays-0 px-3 py-4 pr-7 border border-grays-50 focus-visible:outline-none ${
            item.listing?.priority ? "shadow-status" : ""
          }`}
        >
          <div className="w-[80px] h-[80px] overflow-hidden rounded-lg">
            <Image
              src={"/images/" + item.firstContent.property.thumbnailKey}
              alt={item.firstContent.property.thumbnailKey}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`flex flex-col gap-2`}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5">
                {/* prices */}
                {!isAccomodation && (
                  <div className="flex gap-2.5">
                    <span className="body_xs">
                      {currentCurrency.shortName}
                      {
                        item.firstContent.prices.find(
                          (el) => el.currency === currentCurrency.name
                        )?.freeholdPrice
                      }
                    </span>
                    <span className="body_xs text-grays-500">
                      {prices.formattedPrice}
                    </span>
                  </div>
                )}

                {isAccomodation && (
                  <div className="flex gap-2.5">
                    <span className="body_xs">
                      {currentCurrency.shortName}
                      {
                        item.firstContent.prices.find(
                          (el) => el.currency === currentCurrency.name
                        )?.monthlyPrice
                      }
                      /month
                    </span>
                    <span className="body_xs text-grays-500">
                      {prices.formattedPrice}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2.5">
                {/* bedrooms and area */}
                <div className="flex gap-4">
                  {!isAccomodation &&
                    item?.properties &&
                    item.properties[0].bedrooms && (
                      <div className="flex gap-1 items-center">
                        <Icon iconName="bed" fill="#4B4D4C" />
                        <span className="body_xs text-grays-800">
                          {item.properties[0].bedrooms}{" "}
                          <span className="hidden sm:inline md:hidden lg:inline xl:hidden">
                            BR
                          </span>
                          <span className="hidden sm:hidden lg:hidden xl:inline">
                            bedrooms
                          </span>
                        </span>
                      </div>
                    )}

                  {/* bedrooms */}
                  {isAccomodation &&
                    item?.properties &&
                    item?.properties[0].bedrooms && (
                      <div className="flex gap-1 items-center">
                        <Icon iconName="bed" fill="#4B4D4C" />
                        <span className="body_xs text-grays-800">
                          {item.properties[0].bedrooms}{" "}
                          <span className="">BR</span>
                        </span>
                      </div>
                    )}

                  {/* area */}
                  {!isAccomodation &&
                    item?.properties &&
                    item.properties[0].buildArea && (
                      <div className="flex gap-1 items-center">
                        <Icon iconName="measure" fill="#4B4D4C" />
                        <span className="body_xs text-grays-800 sm:whitespace-nowrap">
                          {item.properties[0].buildArea} m<sup>2</sup>
                        </span>
                      </div>
                    )}
                  {((item?.properties[0] && item.properties[0].landSize) ||
                    item) && (
                    <div className="flex gap-1 items-center sm:whitespace-nowrap">
                      <Icon iconName="measure" fill="#4B4D4C" />
                      <span className="body_xs text-grays-800">
                        {item.properties[0].landSize} are
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-4">
                  <p className="body_xs text-grays-700 whitespace-nowrap">
                    {(item.listing.leaseDuration > 0 ||
                      item.listing.extensionGuaranteed) &&
                      item.listing.leaseDuration + " years "}
                    {item.listing.extensionGuaranteed &&
                      "+ extension guarantee"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCardMobile;
