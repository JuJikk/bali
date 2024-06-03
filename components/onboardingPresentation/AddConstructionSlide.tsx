import React from "react";
import Icon from "../ui/Icon";
import Image from "next/image";
import property1 from "@/public/images/property1.png";

const AddConstructionSlide = () => {
  return (
    <div className="bg-beiges-500 px-11 py-11 pb-0 max-h-[420px] h-[420px] overflow-hidden">
      <div className="bg-grays-0 shadow-user-menu flex flex-col gap-2 rounded-t-xl p-3.5 pb-0 min-w-[270px]">
        <div className="flex gap-3 items-center">
          <Icon iconName="arrow-left" fill="none" stroke="black" width="14" />
          <div className="heading_h5 !text-[11.92px]">List villa for sale</div>
        </div>
        <div className="flex flex-col gap-[7.15px] heading_h6 !text-[8.36px] !leading-4">
          <div className="heading_h6 !text-[8.36px] !leading-4 px-[10.53px] py-[8.54px] border border-grays-50 bg-grays-50 rounded-[5.96px] flex justify-between items-center">
            <div>Construction status</div>
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
          <div className="flex flex-col gap-[4.78px]">
            <span>Construction Status</span>
            <div className="flex gap-[9.54px]">
              <div className="body_l !text-[7.75px] px-[7.15px] py-[1.77px] !leading-4 bg-grays-25 rounded-[60px] border border-grays-25">
                Off-Plan
              </div>
              <div className="body_l !text-[7.75px] px-[7.15px] py-[1.77px] text-grays-700 !leading-4 bg-grays-0 rounded-[60px] border border-grays-200">
                Completed
              </div>
              <div className="body_l !text-[7.75px] px-[7.15px] py-[1.77px] text-grays-700 !leading-4 bg-grays-0 rounded-[60px] border border-grays-200">
                Unfinished Construction
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[4.78px]">
            <div>
              Est. date of construction completion{" "}
              <span className="text-grays-500">(Optional)</span>
            </div>
            <div className="flex gap-[9.54px]">
              <div className="flex-1 w-full body_s !text-[8.36px] !leading-4 px-[10.53px] py-[3.54px] border border-grays-50 rounded-[5.96px] flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Icon
                    iconName="calendar-2"
                    fill="none"
                    stroke="#292D32"
                    width="10"
                  />
                  <span className="body_s !text-base leading-[150%]">2025</span>
                </div>
                <Icon
                  iconName="arrow"
                  fill="none"
                  stroke="black"
                  viewBox="0 0 16 16"
                  width="10"
                />
              </div>
              <div className="body_s !text-[8.36px] !leading-4 px-[10.53px] py-[3.54px] border border-grays-50 rounded-[5.96px] flex justify-between flex-1 w-full items-center">
                <div className="flex items-center gap-1.5">
                  <Icon
                    iconName="calendar-2"
                    fill="none"
                    stroke="#292D32"
                    width="10"
                  />
                  <span className="body_s !text-base leading-[150%]">
                    February
                  </span>
                </div>
                <Icon
                  iconName="arrow"
                  fill="none"
                  stroke="black"
                  viewBox="0 0 16 16"
                  width="10"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[4.78px]">
            <div>
              Construction Start Date{" "}
              <span className="text-grays-500">(Optional)</span>
              <p className="text-grays-700">
                If you fill this, we will show the progress bar in your listing.
              </p>
            </div>
            <div className="flex gap-[9.54px]">
              <div className="flex-1 w-full body_s !text-[8.36px] !leading-4 px-[10.53px] py-[3.54px] border border-grays-50 rounded-[5.96px] flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Icon
                    iconName="calendar-2"
                    fill="none"
                    stroke="#292D32"
                    width="10"
                  />
                  <span className="body_s !text-base leading-[150%]">2025</span>
                </div>
                <Icon
                  iconName="arrow"
                  fill="none"
                  stroke="black"
                  viewBox="0 0 16 16"
                  width="10"
                />
              </div>
              <div className="body_s !text-[8.36px] !leading-4 px-[10.53px] py-[3.54px] border border-grays-50 rounded-[5.96px] flex justify-between flex-1 w-full items-center">
                <div className="flex items-center gap-1.5">
                  <Icon
                    iconName="calendar-2"
                    fill="none"
                    stroke="#292D32"
                    width="10"
                  />
                  <span className="body_s !text-base leading-[150%]">
                    February
                  </span>
                </div>
                <Icon
                  iconName="arrow"
                  fill="none"
                  stroke="black"
                  viewBox="0 0 16 16"
                  width="10"
                />
              </div>
            </div>
          </div>
          <div className="h-[108.24] bg-grays-25 w-full rounded-[9.55px] p-[7.16px]">
            <div>Construction Updates (1)</div>
            <p className="text-grays-600 pb-[2px]">
              Add photos of different stages of construction process
            </p>
            <div className="flex gap-[7.16px] items-center p-[4.78px] bg-grays-0 rounded-[9.55px] mb-[3px]">
              <Image
                src={property1}
                className="w-[26.26px] h-[26.26px] rounded-[7.16px]"
                alt="image"
              />
              <p>2024 March | 3 Photos</p>
            </div>
            <div className="flex gap-[9.55px] items-center">
              <span>Add construction update</span>
              <div className="rotate-180">
                <Icon
                  iconName="arrow-left"
                  fill="none"
                  stroke="black"
                  width="9.55"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddConstructionSlide;
