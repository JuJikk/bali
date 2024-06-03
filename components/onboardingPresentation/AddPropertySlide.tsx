import React from "react";

const AddPropertySlide = () => {
  return (
    <div className="bg-beiges-500 px-11 py-11 pb-0 max-h-[420px] h-[420px] overflow-hidden">
      <div className="bg-grays-0 shadow-user-menu flex flex-col gap-3 rounded-xl p-3.5 min-w-[270px]">
        <div className="heading_h5 !text-[11.92px]">Add New Listing</div>
        <div className="flex justify-between">
          <div className="body_l !text-[8.35px]">Select Property Type</div>
          <div className="flex gap-[9.54px]">
            <div className="body_l !text-[7.75px] px-[7.15px] py-[4.77px] !leading-4 bg-grays-25 rounded-[60px] border border-grays-25">
              For Sale
            </div>
            <div className="body_l !text-[7.75px] px-[7.15px] py-[4.77px] !leading-4 bg-grays-0 rounded-[60px] border border-grays-200">
              For rent
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[7.15px]">
          <div className="heading_h5 !text-[9.54px] !leading-4 px-[10.53px] py-[9.54px] border border-grays-600 rounded-[5.96px]">
            Villa
          </div>
          <div className="heading_h5 !text-[9.54px] !leading-4 px-[10.53px] py-[9.54px] border border-grays-50 rounded-[5.96px]">
            Apartment
          </div>
          <div className="heading_h5 !text-[9.54px] !leading-4 px-[10.53px] py-[9.54px] border border-grays-50 rounded-[5.96px]">
            Commercial
          </div>
          <div className="heading_h5 !text-[9.54px] !leading-4 px-[10.53px] py-[9.54px] border border-grays-50 rounded-[5.96px]">
            Land
          </div>
        </div>
        <div className="flex justify-between">
          <div className="body_l !text-[8.35px]">Types of Ownership</div>
          <div className="flex gap-[9.54px]">
            <div className="body_l !text-[7.75px] px-[7.15px] py-[4.77px] !leading-4 bg-grays-25 rounded-[60px] border border-grays-25">
              Leasehold
            </div>
            <div className="body_l !text-[7.75px] px-[7.15px] py-[4.77px] !leading-4 bg-grays-0 rounded-[60px] border border-grays-200">
              Freehold
            </div>
          </div>
        </div>
        <div className="body_l !text-[7.75px] px-[7.15px] py-[4.77px] w-full text-center rounded-[9.54px] !leading-4 border border-grays-1000 bg-grays-1000 text-grays-0">
          Continue
        </div>
      </div>
    </div>
  );
};

export default AddPropertySlide;
