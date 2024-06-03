import React from "react";
import Icon from "../ui/Icon";

const AddAdditionalSlide = () => {
  return (
    <div className="bg-beiges-500 px-11 py-11 pb-0 max-h-[420px] h-[420px] overflow-hidden">
      <div className="bg-grays-0 shadow-user-menu flex flex-col gap-2 rounded-t-xl p-3.5 pb-0 min-w-[270px]">
        <div className="flex gap-3 items-center">
          <Icon iconName="arrow-left" fill="none" stroke="black" width="14" />
          <div className="heading_h5 !text-[11.92px]">List villa for sale</div>
        </div>
        <div className="flex flex-col gap-[7.15px] heading_h6 !text-[8.36px] !leading-4">
          <div className="heading_h6 !text-[8.36px] !leading-4 px-[10.53px] py-[8.54px] border border-grays-50 bg-grays-50 rounded-[5.96px] flex justify-between items-center">
            <div>
              Return on Investment (ROI) Estimation{" "}
              <span className="text-grays-500">(Optional)</span>
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
          <div className="flex flex-col gap-[4.78px]">
            <div className="flex justify-between items-center">
              <span className="heading_h6 !text-[8.36px] !leading-3 text-grays-1000 ">
                Show ROI estimation in my listing
              </span>
              <div className="relative bg-grays-600 w-[26.86px] h-[9.55px] rounded-[13.73px]">
                <div className="bg-grays-1000 h-[14.33px] w-[14.33px] rounded-full absolute top-1/2 -translate-y-1/2 right-0"></div>
              </div>
            </div>
            <p className="text-grays-800 body_s !text-[8.36px] !leading-[12.5px]">
              We have pre-filled the calculation with data that is average in
              the market based on your property price. Please adjust each
              parameter individually to get an accurate estimation.
            </p>
          </div>
          <div className="flex justify-between items-center">
            <span className="heading_h6 !text-[8.36px] !leading-3 text-grays-1000 ">
              Currency
            </span>
            <div className="border border-grays-500 w-[10px] h-[10px] rounded-full relative flex justify-center">
              <div className="flex flex-col justify-center gap-[1.19px]">
                <div className="w-[1px] h-[1px] bg-grays-500 rounded-full"></div>
                <div className="w-[1px] h-[3px] bg-grays-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="heading_h6 !text-[8.36px] !leading-4 px-[10.53px] py-[8.54px] border border-grays-50 rounded-[5.96px] flex justify-between items-center">
            <div>USD</div>
            <Icon
              iconName="arrow"
              fill="none"
              stroke="black"
              viewBox="0 0 16 16"
              width="10"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="heading_h4 !text-[8.36px] !leading-3">
              Scenario
            </span>
            <div className="flex gap-[4.77px] items-center">
              <div className="w-[57.1px] !leading-[10px] bg-grays-50 flex justify-center items-center py-[4.05px] rounded-[5.95px]">
                Pessimistic
              </div>
              <div className="w-[57.1px] !leading-[10px] bg-grays-50 flex justify-center items-center py-[4.05px] rounded-[5.95px]">
                Neutral
              </div>
              <div className="w-[57.1px] !leading-[10px] bg-grays-50 flex justify-center items-center py-[4.05px] rounded-[5.95px]">
                Optimistic
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="heading_h6 !text-[8.36px] !leading-3">
              Occupancy
            </span>
            <div className="flex gap-[4.77px] items-center">
              <div className="w-[57.1px] !leading-[10px] border border-grays-50 px-[10.75px] py-[4.05px] rounded-[5.95px] h-[32.23px] flex items-center justify-center">
                70%
              </div>
              <div className="w-[57.1px] !leading-[10px] border border-grays-50 px-[10.75px] py-[4.05px] rounded-[5.95px] h-[32.23px] flex items-center justify-center">
                80%
              </div>
              <div className="w-[57.1px] !leading-[10px] border border-grays-50 px-[10.75px] py-[4.05px] rounded-[5.95px] h-[32.23px] flex items-center justify-center">
                90%
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="heading_h4 !text-[8.36px] !leading-3">
              Villa Type 1
            </span>
            <div className="flex gap-[4.77px] items-center">
              <div className="w-[57.1px] !leading-[10px] bg-grays-50 flex justify-center items-center py-[4.05px]  rounded-[5.95px]">
                $336K
              </div>
              <div className="w-[57.1px] !leading-[10px] bg-grays-50 flex justify-center items-center py-[4.05px]  rounded-[5.95px]">
                $336K
              </div>
              <div className="w-[57.1px] !leading-[10px] bg-grays-50 flex justify-center items-center py-[4.05px] rounded-[5.95px]">
                $336K
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="heading_h6 !text-[8.36px] !leading-3">
              Nightly Rate
            </span>
            <div className="flex gap-[4.77px] items-center">
              <div className="w-[57.1px] !leading-[10px] border border-grays-50 px-[10.75px] py-[4.05px] rounded-[5.95px] h-[32.23px] flex items-center justify-center">
                $336
              </div>
              <div className="w-[57.1px] !leading-[10px] border border-grays-50 px-[10.75px] py-[4.05px] rounded-[5.95px] h-[32.23px] flex items-center justify-center">
                $373.33
              </div>
              <div className="w-[57.1px] !leading-[10px] border border-grays-50 px-[10.75px] py-[4.05px] rounded-[5.95px] h-[32.23px] flex items-center justify-center">
                $420
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center pb-2">
            <span className="heading_h6 !text-[8.36px] !leading-3">
              Monthly Expenses
            </span>
            <div className="min-w-[180.81px] !leading-[10px] border border-grays-50 px-[10.75px] py-[4.05px] rounded-[5.95px] h-[32.23px] flex items-center justify-start">
              $840 (USD)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdditionalSlide;
