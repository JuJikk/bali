"use client";
import React, { useEffect, useState } from "react";
import TheButton from "../ui/TheButton";
import { Slide } from "react-slideshow-image";
import AddPropertySlide from "./AddPropertySlide";
import PresentationSlide from "./PresentationSlide";
import AddDetailsSlide from "./AddDetailsSlide";
import AddConstructionSlide from "./AddConstructionSlide";
import AddAdditionalSlide from "./AddAdditionalSlide";
import PublishSlide from "./PublishSlide";
import { useRouter } from "next/navigation";

type StepComponent = React.FC<any>;

export type Step = {
  title: string;
  text: string;
  component: StepComponent;
  img: string;
};

const FallbackComponent: React.FC = () => (
  <div>No specific component provided for this step.</div>
);

const steps: Step[] = [
  {
    title: "Choose Property Type",
    text: "Kick off your listing by choosing the sale or rental option, specifying the property type, and defining the ownership terms.",
    component: AddPropertySlide,
    img: "/images/presentation/step1.png",
  },
  {
    title: "Add Property Details",
    text: "Fill in the required General Details such as description and images, as well as Property Details like size and rooms, to give buyers or renters a clear picture of your property.",
    component: AddDetailsSlide,
    img: "/images/presentation/step2.png",
  },
  {
    title: "Add Construction Details",
    text: "If applicable, add the construction status of your property. This step is optional but can provide valuable information to buyers.",
    component: AddConstructionSlide,
    img: "/images/presentation/step3.png",
  },
  {
    title: "Add Additional Details",
    text: "Optionally include additional information such as return on investment estimation and other unique features of your property.",
    component: AddAdditionalSlide,
    img: "/images/presentation/step4.png",
  },
  {
    title: "Publish Your Listing",
    text: "Review your entered information to ensure accuracy and completeness. When you're satisfied, go ahead and make your property visible to potential buyers or renters.",
    component: PublishSlide,
    img: "/images/presentation/step5.png",
  },
];

const OnboardingPresentation = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleGoToAddProperty = () => {
    router.push("/add-new-listing/sale/leasehold-villa");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:gap-[136px] justify-center lg:py-12 lg:px-8 no_mt bg-beiges-600 max-w-[454px] lg:max-w-full w-full min-h-[calc(100dvh-92px)] ">
      <div className="flex flex-col gap-8 w-full lg:w-auto ">
        <div className="flex-1 self-center lg:self-auto flex flex-col gap-4 max-w-[454px] lg:bg-none">
          <p className="text-center heading_h6 lg:hidden">0% commission</p>
          <h1 className="heading_h4 text-[1.5rem] lg:heading_h1 text-center lg:text-start">
            Add property in 5 easy steps
          </h1>
          <h2 className="body_m lg:heading_h3 text-center lg:text-start">
            Most sellers list in 3 minutes
          </h2>
          <p className="body_m text-grays-600 hidden lg:block">
            Discover the simplest way to showcase your property to a wide
            audience without any cost. With our platform, you enjoy 0%
            commission, ensuring you get the full value of your deal.
          </p>
        </div>
        <TheButton onClick={handleGoToAddProperty} className="hidden lg:block">
          List your Property for Free
        </TheButton>
      </div>
      <div className="slide-container presentation_slide w-full lg:w-[454px] relative select-none cursor-pointer pb-11 lg:pb-0 bg-grays-0 lg:bg-none">
        <Slide
          autoplay={true}
          pauseOnHover
          indicators={true}
          transitionDuration={200}
          infinite={false}
          canSwipe
          arrows={false}
          slidesToShow={1}
          slidesToScroll={1}
          cssClass="tutorial-slider"
        >
          {steps.map((step, index) => {
            return (
              <div
                key={step.title}
                className="flex justify-center items-center overflow-hidden lg:rounded-2xl"
              >
                <PresentationSlide
                  step={step}
                  index={index}
                ></PresentationSlide>
              </div>
            );
          })}
        </Slide>
      </div>
      <div className="lg:hidden bg-grays-0 pb-11 w-full flex justify-center px-5">
        <TheButton onClick={handleGoToAddProperty} className="w-full">
          List your Property for Free
        </TheButton>
      </div>
    </div>
  );
};

export default OnboardingPresentation;
