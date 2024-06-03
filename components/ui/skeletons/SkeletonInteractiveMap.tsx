import React from "react";

const SkeletonInteractiveMap = () => {
  return (
    <div
      className={`h-[calc(100vh-234px)] min-h-[600px] lg:h-[calc(100vh-92px)] top-0 -mr-0 lg:-mr-8`}
    >
      <div className="h-full lg:h-[870px] bg-grays-50 w-full relative">
        <div className="absolute top-[188px] left-[90px] w-[70px] h-[26px] py-1 px-3 rounded-[100px] bg-grays-0 flex items-center justify-center  shadow-marker whitespace-nowrap">
          <p className="text-grays-800 body_xs !text-xs flex items-center gap-2">
            <span className="text-grays-1000 body_l !text-xs !leading-[18px]">
              $
            </span>
            233K
          </p>
        </div>
        <div className="absolute top-[313px] left-[145px] w-[70px] h-[26px] py-1 px-3 rounded-[100px] bg-grays-0 flex items-center justify-center  shadow-marker whitespace-nowrap">
          <p className="text-grays-800 body_xs !text-xs flex items-center gap-2">
            <span className="text-grays-1000 body_l !text-xs !leading-[18px]">
              $
            </span>
            233K
          </p>
        </div>
        <div className="absolute top-[520px] right-[89px] w-[70px] h-[26px] py-1 px-3 rounded-[100px] bg-grays-0 flex items-center justify-center  shadow-marker whitespace-nowrap">
          <p className="text-grays-800 body_xs !text-xs flex items-center gap-2">
            <span className="text-grays-1000 body_l !text-xs !leading-[18px]">
              $
            </span>
            233K
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkeletonInteractiveMap;
