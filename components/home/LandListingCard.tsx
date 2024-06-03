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
import { LandDetails } from "@/models/basic";
import { useRef } from "react";
import { useCurrencyStore } from "@/store/currencyStore";
import { formatPrices } from "@/utils/calculations";

type ListingCardProps = {
  item: LandDetails;
  onHover?: (id: number) => void;
  onLeave?: () => void;
};

const LandListingCard: React.FC<ListingCardProps> = ({
  item,
  onHover = () => {},
  onLeave = () => {},
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

  if (!item.lands || !item.listingId) {
    return (
      <div className="text-center py-4">Invalid property data provided.</div>
    );
  }

  const priceIdr = formatPrices(item.firstContent.prices, undefined);

  return (
    <div
      className={`hover_action flex flex-col relative cursor-pointer rounded-2xl h-fit lg:min-w-[380px] ${
        item?.listing?.priority ? "shadow-status" : ""
      }`}
      onMouseEnter={() => onHover(item.listingId)}
      onMouseLeave={() => onLeave()}
      ref={observerRef}
    >
      <div className="absolute left-4 top-4 flex gap-2 z-[2]">
        {/* villa or leasehold */}
        {item?.listing && item?.listing.leasehold && (
          <TheChip type="live">Leasehold</TheChip>
        )}
        {/* {details?.listing.freehold && <TheChip type="live">Freehold</TheChip>} */}
        {/* rating */}
        <TheChip type="rating">
          <Icon iconName="star" viewBox="0 0 16 17" width="16" height="17" />
          <span>{item?.listing && item?.listing.stars}</span>
        </TheChip>
      </div>

      <div className="max-h-[220px] overflow-hidden flex justify-center items-center rounded-t-2xl relative z-[1]">
        {/* image slider */}
        <ImageSlider images={item.images.map((image) => image.key)} />
      </div>
      <div
        className={`border_on_hover flex flex-col p-4 gap-2 border border-t-0 rounded-b-2xl ${
          item?.listing && item.listing.priority
            ? "bg-beiges-400 border-beiges-900 border_on_hover_status"
            : "bg-grays-0 border-grays-50"
        }`}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2.5">
            {/* title */}
            <div className="flex gap-2.5">
              <Icon iconName="map2" fill="none" stroke="black" />
              <span className="body_s">{item.firstContent.land.title}</span>
            </div>

            {/* prices */}
            <div className="flex gap-2.5">
              <span className="body_l">
                {currentCurrency.shortName}
                {
                  item.firstContent.prices.find(
                    (el) => el.currency === currentCurrency.name
                  )?.freeholdPrice
                }
                /year
              </span>
              {currentCurrency.name !== "IDR" && (
                <span className="body_l !leading-[26px] text-grays-500">
                  {priceIdr.formattedPrice}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex gap-4">
              {/* area */}
              <div className="flex gap-1 items-center sm:whitespace-nowrap">
                <Icon iconName="measure" fill="#4B4D4C" />
                <span className="body_s text-grays-800">
                  {item.firstContent.land.landSize} are
                </span>
              </div>
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
        <div className="border-t border-grays-50 flex items-center justify-between pt-2.5 gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-dark_blue flex items-center justify-center overflow-hidden">
              <Image
                src={diamndsImage}
                alt="diamonds"
                width={32}
                height={19}
                className="object-contain -translate-y-[1px] scale-95"
              />
            </div>
            <p className="bosy_s">
              <span className="text-grays-700">Posted by </span>
              {item.firstContent?.owner?.name}
            </p>
          </div>
          <button
            type="button"
            aria-label={likedCards[item.listingId] ? "Saved" : "Unsaved"}
            className="flex items-center justify-center p-2.5 border rounded-full border-grays-200 max-w-9 max-h-9"
            onClick={handleLike}
          >
            <LikeButton
              classType={likedCards[item.listingId] ? "active" : ""}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandListingCard;
