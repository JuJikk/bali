import { FC } from "react";
import Icon from "../ui/Icon";

type MarkerIconProps = {
  price: number;
  markerStyle?: "price" | "EXACT" | "GENERAL";
};

function formatNumberAsK(num: number) {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toString();
}

const MarkerIcon: FC<MarkerIconProps> = ({ price, markerStyle = "price" }) => {
  const priceToShow = formatNumberAsK(price);
  return (
    <>
      {markerStyle === "EXACT" ? (
        <div className="mb-[35px]">
          <Icon
            iconName="mapMarker"
            viewBox="0 0 30 30"
            fill="red"
            height="70"
            width="70"
          />
        </div>
      ) : null}

      {markerStyle === "GENERAL" ? (
        <div
          className="w-[80px] h-[80px] rounded-full border"
          style={{
            backgroundColor: "rgba(64, 175, 255, 0.5)",
            borderColor: "rgb(64, 175, 255)",
          }}
        ></div>
      ) : null}

      {markerStyle === "price" ? (
        <div className="marker_container py-1 px-3 rounded-[100px] bg-grays-0 flex items-center justify-center shadow-marker hover:scale-110 transition-all duration-300">
          <p className="text-grays-800 body_xs !text-xs flex items-center gap-2">
            <span className="text-grays-1000 body_l !text-xs !leading-[18px]">
              $
            </span>
            {priceToShow}
          </p>
        </div>
      ) : null}
    </>
  );
};

export default MarkerIcon;
