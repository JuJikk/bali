import NewListingAddForm from "@/components/listings/NewListingAddForm";
import React from "react";

const page = () => {
  return (
    <div className="pt-[92px] lg:pt-0 block sm:flex justify-center items-center sm:h-screen lg:h-[calc(100dvh-92px)] w-screen bg-beiges-600 relative">
      <NewListingAddForm />
      <div className="absolute sm:hidden bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-grays-1000 rounded-[100px]"></div>
    </div>
  );
};

export default page;
