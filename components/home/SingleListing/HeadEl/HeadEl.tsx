import diamndsImage from "@/public/images/diamonds.png";
import Icon from "@/components/ui/Icon";
import LikeButton from "@/components/ui/LikeButton";
import { PropertiesDetails } from "@/models/basic";
import Image from "next/image";
import { useState } from "react";
import { useCurrencyStore } from "@/store/currencyStore";
import { useLikeStore } from "@/store/likeStore";
import Toast from "@/components/ui/Toast";
import { toast } from "react-toastify";

type HeadElProps = { propertyDetails: PropertiesDetails };

function HeadEl({ propertyDetails }: HeadElProps) {
  const { likedCards, likeCount, toggleLike } = useLikeStore();
  const { currentCurrency } = useCurrencyStore();
  const [clickedLikedBtn, setClickLikeButton] = useState<boolean>(false);

  // const handleLike = () => {
  //   toggleLike(propertyDetails.property.listingId);
  //   const newCount = likedCards[propertyDetails.property.listingId]
  //     ? likeCount - 1
  //     : likeCount + 1;
  //   const message = likedCards[propertyDetails.property.listingId]
  //     ? "Listing removed!"
  //     : "Listing saved!";

  //   toast(<Toast status={message} listingsSaved={newCount} />);
  // };

  return (
    <>
      <div className="hidden lg:flex justify-between items-center pt-6">
        <div className="">
          <h1 className="text-3xl font-bold">
            {propertyDetails?.listing?.title}
          </h1>
          <div className="flex gap-2 mt-2">
            {propertyDetails?.listing?.leasehold && (
              <div className="flex items-center bg-grays-1000 text-grays-0 text-xs font-light py-1 px-3 rounded-[100px]">
                Leasehold
              </div>
            )}
            <div className="flex items-center bg-gray-200 text-gray-700 text-xs font-normal px-3 py-1 border border-grays-1000 rounded-[100px]">
              {propertyDetails?.construction &&
                propertyDetails.construction[0]?.status && <div>OFF PLAN</div>}
            </div>
            <div className="flex items-center justify-center text-gray-500">
              <Icon iconName="map2" fill="none" stroke="black" />
              <div className="px-2 text-grays-700 text-sm">
                {propertyDetails?.listing?.location}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={clickedLikedBtn ? "Saved" : "Unsaved"}
            className="hidden sm:flex items-center justify-center p-2.5 border rounded-full border-grays-200 max-w-9 max-h-9"
          >
            <Icon iconName="printer" fill="none" stroke="#AFAEAA" />
          </button>

          {/* <button
            type="button"
            aria-label={
              likedCards[propertyDetails.property.listingId]
                ? "Saved"
                : "Unsaved"
            }
            className="flex items-center justify-center p-2.5 border rounded-full border-grays-200 max-w-9 max-h-9"
            onClick={handleLike}
          >
            <LikeButton
              classType={
                likedCards[propertyDetails.property.listingId] ? "active" : ""
              }
            />
          </button> */}
        </div>
      </div>

      {/* <div className="hidden sm:flex justify-between items-center pt-4 pb-8"> */}
      <div className="lg:flex-row lg:items-center lg:gap-0 hidden lg:flex flex-col gap-2 justify-between items-start pt-4 pb-8 ">
        <div className="flex items-center">
          <div className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-dark_blue flex items-center justify-center overflow-hidden">
            {propertyDetails.firstContent?.owner?.image ? (
              <Image
                src={"/images/owner1.jpeg"}
                alt="owner"
                width={32}
                height={19}
                className="object-cover w-auto"
              />
            ) : (
              <Image
                src={diamndsImage}
                alt="diamonds"
                width={32}
                height={19}
                className="object-contain -translate-y-[1px] scale-95"
              />
            )}
          </div>
          <div className="pl-[10px]">
            <span className="text-grays-700">Listed by</span>
            <span className="text-black"> Owner</span>
          </div>
        </div>

        <div>
          <span className="text-h3 leading-h3 text-grays-500">
            {propertyDetails.firstContent.prices.find(
              (el) => el.currency === "IDR"
            )?.freeholdPrice! / 1000000}{" "}
            billion IDR
          </span>
          <span className="text-h3 leading-h3 text-black pl-6 font-semibold">
            {currentCurrency.shortName}
            {
              propertyDetails.firstContent.prices.find(
                (el) => el.currency === currentCurrency.name
              )?.freeholdPrice
            }
          </span>
        </div>
      </div>
    </>
  );
}

export default HeadEl;
