import React from "react";

const loading = () => {
  return (
    <div className="flex flex-row items-center gap-[136px] justify-center bg-gray-50 lg:py-12 sm:px-6 lg:px-8 no_mt">
      <div className="flex-1 flex flex-col gap-2 w-full h-full lg:h-auto sm:max-w-[454px] overflow-auto shadow-user-menu bg-grays-25 px-6 sm:py-6 sm:rounded-b-2xl rounded-t-2xl justify-center min-h-[calc(100dvh-92px)] sm:min-h-[500px] sm:max-h-[500px]">
        <div className="w-[454px] h-[500px]"></div>
      </div>
      <div className="absolute sm:hidden bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-grays-1000 rounded-[100px]"></div>
    </div>
  );
};

export default loading;