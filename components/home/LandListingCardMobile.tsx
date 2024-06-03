"use client";
import Image from "next/image";
import Icon from "../ui/Icon";
import { useCurrencyStore } from "@/store/currencyStore";
import { LandDetails } from "@/models/basic";
import Link from "next/link";
import { formatPrices } from "@/utils/calculations";

type LandListingCardServerMobileProps = {
  item: LandDetails;
};

const LandListingCardMobile: React.FC<LandListingCardServerMobileProps> = ({
  item,
}) => {
  const { currentCurrency } = useCurrencyStore();

  const pricesIdr = formatPrices(item.firstContent.prices, undefined);

  return (
    <div className="p-5 min-w-[280px]">
      <Link href={"/properties/" + item.listingId} className="select-none">
        <div
          className={`flex flex-row gap-4 items-center relative cursor-pointer rounded-2xl h-fit bg-grays-0 px-3 py-4 pr-7 border border-grays-50 focus-visible:outline-none ${
            item.listing?.priority ? "shadow-status" : ""
          }`}
        >
          <div className="w-[80px] h-[80px] overflow-hidden rounded-lg">
            <Image
              src={"/images/" + item.firstContent.land.thumbnailKey}
              alt={item.firstContent.land.thumbnailKey}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`flex flex-col gap-2`}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5">
                {/* prices */}
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
                    {pricesIdr.formattedPrice}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                {/* bedrooms and area */}
                <div className="flex gap-4">
                  {/* area */}
                  <div className="flex gap-1 items-center">
                    <Icon iconName="measure" fill="#4B4D4C" />
                    <span className="body_xs text-grays-800">
                      {item.firstContent.land.landSize} are
                    </span>
                  </div>
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

export default LandListingCardMobile;
