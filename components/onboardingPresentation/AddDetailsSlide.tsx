import React from "react";
import Icon from "../ui/Icon";

const AddDetailsSlide = () => {
  return (
    <div className="bg-beiges-500 px-11 py-11 pb-0 max-h-[420px] h-[420px] overflow-hidden">
      <div className="bg-grays-0 shadow-user-menu flex flex-col gap-2 rounded-t-xl p-3.5 pb-0 min-w-[270px]">
        <div className="flex gap-3 items-center">
          <Icon iconName="arrow-left" fill="none" stroke="black" width="14" />
          <div className="heading_h5 !text-[11.92px]">Add New Listing</div>
        </div>
        <div className="flex flex-col gap-[7.15px]">
          <div className="heading_h6 !text-[8.36px] !leading-4 px-[10.53px] py-[8.54px] border border-grays-50 bg-grays-50 rounded-[5.96px] flex justify-between items-center">
            <div>
              General Details<span className="text-func-red">*</span>
            </div>
            <div className="rotate-180">
              <Icon
                iconName="arrow"
                fill="none"
                stroke="black"
                viewBox="0 0 16 16"
                width="10"
              />
            </div>
          </div>
          <div className="heading_h6 !text-[8.36px] !leading-4 px-[10.53px] py-[8.54px] border border-grays-50 rounded-[5.96px]">
            Luxurious Beachfront Villa in Seminyak
          </div>
          <div className="heading_h6 !text-[8.36px] !leading-4 px-[10.53px] py-[7.54px] pb-[10.1px] border border-grays-50 rounded-[5.96px]">
            Discover luxury living in our breathtaking Bali beachfront villa.
            Boasting a private pool, lush tropical gardens, and modern Balinese
            architecture, this serene sanctuary offers unparalleled relaxation
            and privacy.
          </div>
          <div className="body_s !text-[8.36px] !leading-4 px-[10.53px] py-[8.54px] border border-grays-300 rounded-[5.96px] flex justify-between">
            <div className="flex items-center gap-1.5">
              <Icon iconName="map2" fill="none" stroke="#292D32" width="10" />
              <span>Jl. Sunset Road No.88|</span>
            </div>
            <span className="underline text-grays-900">Select on map</span>
          </div>
          <div className=" relative body_s !text-[8.36px] !leading-4 px-[10.53px] py-[6px] border border-dashed border-grays-200 rounded-[5.96px] flex justify-between flex-col items-center gap-2">
            <Icon
              iconName="gallery-edit"
              fill="none"
              stroke="#292D32"
              width="14"
            />
            <p className="text-grays-500 text-center">
              Upload high-quality photos of your villa. Ensure good lighting and
              clarity to showcase your property&apos;s best features.
            </p>
            <div className="absolute top-0 left-0 -mx-[1px] bg-grays-0 px-[10.13px] py-[6px] shadow-user-menu rounded-[9.55px]">
              Jl. Sunset Road No.88, Seminyak, Kuta, Kabupaten Badung, Bali
              80361
            </div>
          </div>
          <div className="flex">
            <div className="px-1.5 py-[4.78px] body_l !text-[7.76px] !leading-[12px] whitespace-nowrap text-grays-0 bg-grays-700 rounded-tl-[10px]">
              Lease Duration
            </div>
            <div className="px-1.5 py-[4.78px] body_l !text-[7.76px] !leading-[12px] whitespace-nowrap bg-grays-25 text-grays-700 rounded-tr-[10px]">
              Expiration Year & Month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDetailsSlide;
