import { FC } from "react";

const SkeletonItem: FC = () => {
  return (
    <div className="flex flex-col w-full h-[482px]">
      <div className="w-full h-[220px] bg-grays-100 flex flex-row gap-2 pt-4 pl-4 skeleton-blink">
        <div className="w-full h-[29px] max-w-[88px] bg-grays-50 rounded-[100px] skeleton-move"></div>
        <div className="w-full h-[29px] max-w-[61px] bg-grays-50 rounded-[100px] skeleton-move"></div>
      </div>
      <div className="w-full h-[243px] bg-grays-50 rounded-b-2xl skeleton-move"></div>
    </div>
  );
};

export default SkeletonItem;
