"use client";
import Image from "next/image";
import TheChip from "../ui/TheChip";
import Icon from "../ui/Icon";
import diamndsImage from "@/public/images/diamonds.png";
import ImageSlider from "./ImageSlider";
import LikeButton from "../ui/LikeButton";
import { toast } from "react-toastify";
import Toast from "../ui/Toast";
import { useLikeStore } from "@/store/likeStore";
import { useRef } from "react";
import ConstructionBar from "./ConstructionBar";
import { useCurrencyStore } from "@/store/currencyStore";
import { PropertiesDetails } from "@/models/basic";
import Link from "next/link";
import { formatPrices, getPrice } from "@/utils/calculations";

type ListingCardProps = {
  item: PropertiesDetails;
  onHover?: (id: number) => void;
  onLeave?: () => void;
  isAccomodation: boolean;
  period?: "MONTHLY" | "YEARLY";
};

const ListingCard: React.FC<ListingCardProps> = ({
  item,
  onHover = () => {},
  onLeave = () => {},
  isAccomodation,
  period,
}) => {
  const observerRef = useRef(null);
  const { likedCards, likeCount, toggleLike } = useLikeStore();
  const { currentCurrency } = useCurrencyStore();

  const handleLike = () => {
    toggleLike(item.listingId);
    const newCount = likedCards[item.listingId] ? likeCount - 1 : likeCount + 1;
    const message = likedCards[item.listingId]
      ? "Listing removed!"
      : "Listing saved!";

    toast(<Toast status={message} listingsSaved={newCount} />);
  };

  if (!item.properties || !item.listingId) {
    return (
      <div className="text-center py-4">Invalid property data provided.</div>
    );
  }

  const price = getPrice(item.firstContent.prices, currentCurrency.name);

  const pricesIdr = formatPrices(item.firstContent.prices, period);

  return (
    <div
      className={`hover_action flex flex-col relative cursor-pointer rounded-2xl lg:min-w-[380px] h-fit ${
        item.listing?.priority ? "shadow-status" : ""
      }`}
      onMouseEnter={() => onHover(item.listingId)}
      onMouseLeave={() => onLeave()}
      ref={observerRef}
    >
      <div className="absolute left-4 top-4 flex gap-2 z-[2]">
        {/* villa or leasehold */}
        {isAccomodation ? (
          <TheChip type="draft">
            <span className="uppercase">
              {item?.properties && item?.properties[0].propertyType}
            </span>
          </TheChip>
        ) : (
          item?.listing &&
          item?.listing.leasehold && <TheChip type="live">Leasehold</TheChip>
        )}
        {/* rating */}
        <TheChip type="rating">
          <Icon iconName="star" viewBox="0 0 16 17" width="16" height="17" />
          <span>{item?.listing && item?.listing.stars}</span>
        </TheChip>
      </div>

      <div className="max-h-[220px] overflow-hidden flex justify-center items-center rounded-t-2xl relative z-[1]">
        {/* sold banner */}
        {item?.properties && item?.properties[0].available === 0 && (
          <div className="absolute z-10 w-full h-full flex items-center justify-center bg-grays-1000 bg-opacity-40">
            <span className="uppercase heading_h2 text-grays-0">sold</span>
          </div>
        )}

        {/* image slider */}
        {/* {item.images.length > 0 ? ( */}
        <ImageSlider images={item.images.map((image) => image.key)} />
        {/* ) : (
          <div className="flex justify-center items-center overflow-hidden">
            <Image
              src={"/images/" + item?.firstContent.property.thumbnailKey}
              alt="first-image"
              width={410}
              height={220}
              className="object-cover object-center w-full h-full min-h-[220px]"
            />
          </div>
        )} */}

        {/* sold or left chip */}
        {item?.properties && item?.properties[0].sold > 0 && (
          <div className="absolute bottom-4 left-4">
            <TheChip type="rating">
              <p className="body_xs !font-hk_medium sm:whitespace-nowrap">
                <span className="text-func-red">
                  {item?.properties[0].sold} sold
                </span>{" "}
                | {item.properties[0].available} left
              </p>
            </TheChip>
          </div>
        )}

        {/* construction bar */}
        {/* {item && item.properties[0]?.available !== 0 && ( */}
        <ConstructionBar details={item} />
        {/* )} */}
      </div>
      <div
        className={`border_on_hover flex flex-col p-4 gap-2 border border-t-0 rounded-b-2xl ${
          item?.listing && item.listing.priority
            ? "bg-beiges-400 border-beiges-900 border_on_hover_status"
            : "bg-grays-0 border-grays-50"
        }`}
      >
        <Link href={"/listings/" + item.listingId}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2.5">
              {/* prices */}
              <div className="flex gap-2.5">
                <Icon iconName="map2" fill="none" stroke="black" />
                <span className="body_s">{item.listing.title}</span>
              </div>
              {!isAccomodation && (
                <div className="flex gap-2.5">
                  <span className="body_l">
                    {currentCurrency.shortName}
                    {price}
                  </span>
                  <span className="body_l !leading-[26px] text-grays-500">
                    {pricesIdr.formattedPrice}
                  </span>
                </div>
              )}

              {isAccomodation && (
                <div className="flex gap-2.5">
                  <span className="body_l">
                    {currentCurrency.shortName}
                    {
                      item.firstContent.prices.find(
                        (el) => el.currency === currentCurrency.name
                      )?.[period === "YEARLY" ? "yearlyPrice" : "monthlyPrice"]
                    }
                    {period === "YEARLY" ? "/year" : "/month"}
                  </span>
                  <span className="body_l !leading-[26px] text-grays-500">
                    {pricesIdr.formattedPrice}
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
                      <span className="body_s text-grays-800">
                        {item.properties[0].bedrooms}{" "}
                        <span className="hidden sm:inline md:hidden lg:inline xl:hidden">
                          BR
                        </span>
                        <span className="inline sm:hidden lg:hidden xl:inline">
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
                      <span className="body_s text-grays-800">
                        {item.properties[0].bedrooms}{" "}
                        <span className="">BR</span>
                      </span>
                    </div>
                  )}

                {/* area */}
                {item?.properties && item.properties[0].buildArea && (
                  <div className="flex gap-1 items-center">
                    <Icon iconName="measure" fill="#4B4D4C" />
                    <span className="body_s text-grays-800 sm:whitespace-nowrap">
                      {item.properties[0].buildArea} m<sup>2</sup>
                    </span>
                  </div>
                )}
                {((item?.properties && item.properties[0].landSize) ||
                  item) && (
                  <div className="flex gap-1 items-center sm:whitespace-nowrap">
                    <Icon iconName="measure" fill="#4B4D4C" />
                    <span className="body_s text-grays-800">
                      {item.properties[0].landSize} are
                    </span>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <p className="body_s text-grays-700 whitespace-nowrap">
                  {(item.listing.leaseDuration > 0 ||
                    item.listing.extensionGuaranteed) &&
                    item.listing.leaseDuration + " years "}
                  {item.listing.extensionGuaranteed && "+ extension guarantee"}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <div className="border-t border-grays-50 flex items-center justify-between pt-2.5 gap-2.5">
          <div className="flex items-center gap-2.5">
            {item.firstContent?.owner?.image ? (
              <div className="w-8 h-8 min-w-8 min-h-8 rounded-full  flex items-center justify-center overflow-hidden">
                <Image
                  src={"/images/owner1.jpeg"}
                  alt="owner"
                  width={32}
                  height={32}
                  className="object-cover w-auto"
                />
              </div>
            ) : (
              <div className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-dark_blue flex items-center justify-center overflow-hidden">
                <Image
                  src={diamndsImage}
                  alt="diamonds"
                  width={32}
                  height={19}
                  className="object-contain -translate-y-[1px] scale-95"
                />
              </div>
            )}
            <p className="bosy_s">
              <span className="text-grays-700">Posted by </span>
              {item.firstContent?.owner?.name}
            </p>
          </div>
          <button
            type="button"
            aria-label={
              likedCards[item.properties[0].listingId] ? "Saved" : "Unsaved"
            }
            className="flex items-center justify-center p-2.5 border rounded-full border-grays-200 max-w-9 max-h-9"
            onClick={handleLike}
          >
            <LikeButton
              classType={
                likedCards[item.properties[0].listingId] ? "active" : ""
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
