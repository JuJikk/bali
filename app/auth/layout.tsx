import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-[92px] lg:pt-16 pb-20 block sm:flex justify-center items-start sm:min-h-screen lg:min-h-[calc(100dvh-92px)] w-screen bg-beiges-600 relative">
      {children}
      <div className="absolute sm:hidden bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-grays-1000 rounded-[100px]"></div>
    </div>
  );
};

export default layout;
