import { FC } from "react";

const SkeletonSearch: FC = () => {
  return (
    <div className="w-full relative">
      <div className="flex flex-col">
        <div className="flex">
          <div className="w-full max-w-[120px] h-[40px] bg-grays-50 rounded-tl-2xl skeleton-blink"></div>
          <div className="w-full max-w-[120px] h-[40px] bg-grays-50 rounded-tr-2xl skeleton-blink"></div>
        </div>
        <div className="bg-grays-0 lg:max-w-[807px] lg:w-full rounded-2xl p-[12px] lg:p-[22px] gap-6 flex flex-col">
          <div className="flex gap-3">
            <div className="w-full lg:max-w-[648px] h-[59px] bg-grays-50 rounded-[10px] sm:w-full skeleton-move"></div>
            <div className="w-full max-w-[52px] lg:max-w-[104px] h-[59px] bg-grays-50 rounded-2xl skeleton-move"></div>
          </div>
          <div className="flex gap-3 lg:gap-6 flex-wrap">
            <div className="w-full max-w-[112px] h-[32px rounded-[100px] bg-grays-50 skeleton-move"></div>
            <div className="w-full max-w-[78px] h-[32px] rounded-[100px] bg-grays-50 skeleton-move"></div>
            <div className="w-full max-w-[112px] h-[32px] rounded-[100px] bg-grays-50 skeleton-move"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSearch;
