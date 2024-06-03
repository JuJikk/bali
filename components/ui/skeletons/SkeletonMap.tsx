import { FC } from "react";

const SkeletonMap: FC = () => {
  return (
    <div className="hidden lg:block absolute right-0 w-[45%] h-full rounded-l-[120px] overflow-hidden bg-grays-50 skeleton-blink"></div>
  );
};

export default SkeletonMap;
