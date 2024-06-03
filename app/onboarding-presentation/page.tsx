import OnboardingPresentation from "@/components/onboardingPresentation/OnboardingPresentation";
import React from "react";

const page = () => {
  return (
    <div className="pt-[92px] lg:pt-0 flex flex-col lg:flex-row justify-center items-center  h-full min-h-screen lg:min-h-0 lg:h-[calc(100dvh-92px)] w-screen bg-beiges-600 relative">
      <OnboardingPresentation />
    </div>
  );
};

export default page;
