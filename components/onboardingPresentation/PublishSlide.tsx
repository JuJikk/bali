import React from "react";
import Icon from "../ui/Icon";
import Image from "next/image";
import property1 from "@/public/images/property1.png";

const PublishSlide = () => {
  return (
    <div className="bg-beiges-500 px-11 py-11 pb-0 max-h-[420px] h-[420px] overflow-hidden">
      <div className="bg-grays-0 shadow-user-menu flex flex-col gap-2 rounded-xl p-3.5 min-w-[270px] items-center">
        <div className="border border-func-green rounded-md w-[19.1px] h-[19.1px] flex justify-center items-center">
          <Icon iconName="check" width="8" viewBox="0 0 8 6" fill="none"/>
        </div>
        <div className="heading_h5 !text-[11.92px]">Congratulations!</div>
        <p className="text-grays-800 body_s !text-[8.36px] !leading-[12.5px]">
          Your listing has been published and is live!
        </p>
        <div className="border border-grays-200 p-[9.55px] w-full rounded-[9.55px]">
          <div className="pb-[14.32px] border-b border-b-grays-200 flex gap-[14.33px]">
            <Image
              src={property1}
              className="w-[58.5px] h-[39.39px] rounded-[7.16px]"
              alt="image"
            />
            <div className="flex flex-col gap-[7.16px]">
              <p className="text-grays-700 body_xs !text-[9.55px] !leading-3">
                Multi Villa in Ubud
              </p>
              <p className="text-grays-1000 heading_h6 !text-[11.94px] !leading-4">
                From $278,000
              </p>
            </div>
          </div>
          <div className="py-[14.32px] border-b border-b-grays-200 flex gap-[14.33px] items-center">
            <div className="bg-grays-1000 rounded-[59.69px] text-grays-0 px-[7.16px] font-hk_medium text-[8.36px] leading-3 py-[2.39px]">
              Live
            </div>
            <p className="text-grays-700 body_xs !text-[9.55px] !leading-3">
              Valid till June 23, 2024
            </p>
          </div>
          <div className="py-[14.32px] border-b border-b-grays-200 flex gap-[7.16px] items-center">
            <p className="text-grays-1000 body_xs !text-[9.55px] !leading-3 underline">
              Edit
            </p>
            <p className="text-grays-1000 body_xs !text-[9.55px] !leading-3 underline">
              See Listing
            </p>
            <p className="text-grays-1000 body_xs !text-[9.55px] !leading-3 underline">
              Download as PDF presentation
            </p>
          </div>
          <div className="pt-[14.32px] flex gap-[14.33px] items-center">
            <div className="text-grays-1000  !text-[9.55px] flex gap-[7.16px] items-center">
              <Icon iconName="medal" viewBox="0 0 15 15" width="14.33" />
              <p className="font-hk_bold">Priority Placement</p>
              <span className="font-hk_regular text-grays-700">2 days</span>
            </div>
            <div className="text-grays-1000  !text-[9.55px] flex gap-[7.16px] items-center">
              <Icon iconName="medal-star" viewBox="0 0 10 9" width="9.55" />
              <p className="font-hk_bold">21 stars</p>
            </div>
          </div>
        </div>
        <div className="h-[32.23px] flex items-center justify-center font-hk_bold text-[10.74px] px-[7.15px] py-[4.77px] w-full text-center rounded-[9.54px] !leading-4 border border-grays-1000 bg-grays-1000 text-grays-0">
          + New Listing
        </div>
      </div>
    </div>
  );
};

export default PublishSlide;
