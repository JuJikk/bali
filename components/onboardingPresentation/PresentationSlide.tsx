import Image from "next/image";
import React, { FC } from "react";
import { Step } from "./OnboardingPresentation";

type PresentationSlidePorps = {
  step: Step;
  index: number;
};

const PresentationSlide: FC<PresentationSlidePorps> = ({ index, step }) => {
  const Component = step.component;

  return (
    <div className="flex-1 flex flex-col gap-2 w-full h-full lg:h-auto lg:max-w-[454px] lg:overflow-auto shadow-user-menu bg-grays-0 lg:px-6 lg:py-6 lg:rounded-b-2xl justify-center  lg:min-h-fit">
      <div className="lg:px-6 lg:pb-6 flex flex-col gap-6 lg:gap-8">
        <div className="hidden lg:block">
          <Component />
        </div>
        <div className="lg:hidden h-[303px] w-full overflow-hidden">
          <Image
            src={step.img}
            alt="presentation-slide"
            width={393}
            height={303}
            className=" w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col max-w-[327px] gap-2 lg:gap-4 h-[178px] lg:h-[212px] self-center">
          <p className="lg:hidden text-center body_s">Step {index + 1} of 5</p>
          <h3 className="heading_h4 lg:heading_h3 px-4 text-center mb-1">{step.title}</h3>
          <p className="body_s text-grays-600 text-center pb-6">{step.text}</p>
        </div>
      </div>
    </div>
  );
};

export default PresentationSlide;
