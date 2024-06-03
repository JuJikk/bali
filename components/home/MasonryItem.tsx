import diamndsImage from "@/public/images/diamonds.png";

import Image from "next/image";
import Icon from "../ui/Icon";
import { Currency, LandListing } from "@/models/landListings";
import { PropertyListing } from "@/models/propertyListings";

type MasonryItemProps = {
  item: PropertyListing;
  i: number;
};

const MasonryItem: React.FC<MasonryItemProps> = ({ item, i }) => {
  return (
    <li
      key={item.id}
      className={`cursor-pointer relative rounded-[10.75px] lg:rounded-2xl overflow-hidden min-h-[217px] min-w-[184px] lg:max-h-[323px] lg:w-full lg:h-full lg:min-h-[323px]`}
    >
      <div className={` absolute w-full h-full z-[2]`}>
        <Image
          alt="card"
          src={item.imageUrl[0]}
          width={280}
          height={323}
          className="object-cover w-full h-full"
        />
        <div
          className="absolute top-0 left-0 w-full h-full p-4 lg:p-6 flex flex-col justify-between bg-opacity-60 bg-grays-1000"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)",
          }}
        >
          <div className="flex gap-2.5 opacity-80">
            {item.ownerImgUrl ? (
              <div className="w-5 h-5 max-w-5 lg:w-8 lg:h-8 lg:min-w-8 lg:min-h-8 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src={item.ownerImgUrl}
                  alt="owner"
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-5 h-5 max-w-5 lg:w-8 lg:h-8 lg:min-w-8 lg:min-h-8 rounded-full bg-dark_blue flex items-center justify-center overflow-hidden">
                <Image
                  src={diamndsImage}
                  alt="diamonds"
                  className="object-contain lg:-translate-y-[1px] scale-90 lg:scale-95"
                />
              </div>
            )}
            <p className="lg:body_s text-grays-0 text-[10.75px]">
              {item.owner}
            </p>
          </div>
          <div className="flex flex-col gap-2 lg:gap-3">
            <p className="lg:body_s text-[9.41px] text-grays-0  opacity-80">
              Villa FOR SALE
            </p>
            <div className="flex gap-4  opacity-80">
              <div className="flex gap-1 items-center">
                <Icon iconName="bed" fill="#ffffff" />
                <span className="text-[10.75px] lg:body_s text-grays-0">
                  {item.bedroomNumber} BR
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <Icon iconName="measure" fill="#ffffff" />
                <span className="text-[10.75px] lg:body_s text-grays-0">
                  {item.areaInAres / 100} m<sup>2</sup>
                </span>
              </div>
            </div>
            <div className="flex">
              <div className="flex gap-1.5 lg:gap-2.5">
                <span className="text-[12.09px] lg:body_l leading-[20.15px] opacity-100 text-grays-0">
                  {Currency[item.currency as keyof typeof Currency] ?? ".."}
                  {item.price}
                </span>
                <span className="text-[12.09px] lg:body_l leading-[20.15px] lg:!leading-[26px] text-grays-0  opacity-80">
                  {(item.price * 17000) / 1000000000} billion IDR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MasonryItem;
