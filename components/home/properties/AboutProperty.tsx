import { FC, useRef, useState } from "react";
import { PropertiesDetails } from "@/models/basic";
import TheButton from "@/components/ui/TheButton";
import Icon from "@/components/ui/Icon";
import Container from "@/components/container/Container";
type PropertyProps = {
  propertyDetails: PropertiesDetails;
};

const AboutProperty: FC<PropertyProps> = ({ propertyDetails }) => {
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false);
  const toggleRotation = () => setShowFullDescription((prev) => !prev);
  const openModalRef = useRef<any>(null);
  const handleOpenModal = (e: any) => {
    // if (!openModalRef.current) return;
    // openModalRef.current.showModal();
    setShowFullDescription(!showFullDescription);
  };
  const descriptionMaxLength = 150;

  function formatText(text: string) {
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <Container>
      <div className="lg:hidden block border-t border-grays-100 w-full"></div>

      <div className="block w-full pt-[44px] pb-4">
        <div className="lg:flex justify-between w-full">
          <div>
            <h3 className="font-bold text-grays-1000 text-h3 leading-h3">
              About this Property
            </h3>
          </div>

          <ul className="flex flex-wrap lg:justify-between gap-7 list-none text-grays-1000 underline font-normal text-body_m leading-body_m whitespace-nowrap pt-6 lg:pt-[0px]">
            <li className="cursor-pointer">See Location</li>
            <li className="cursor-pointer">ROI Estimate</li>
            <li className="cursor-pointer">Features</li>
            <li className="cursor-pointer">See Video</li>
            <li className="cursor-pointer">Development</li>
          </ul>
        </div>
      </div>

      <div className="w-full lg:pt-[40px] pt-[20px]">
        <div className="hidden lg:flex gap-x-4">
          {propertyDetails.properties[0].equipment ? (
            <div className="bg-grays-25 text-[13px] font-normal text-grays-900 text-sm py-2 px-3 rounded-[100px] leading-[19.5px]">
              {formatText(propertyDetails.properties[0].equipment)}
            </div>
          ) : null}
          {propertyDetails.properties[0].livingType ? (
            <div className="bg-grays-25 text-[13px] font-normal text-grays-900 text-sm py-2 px-3 rounded-[100px] leading-[19.5px]">
              {formatText(propertyDetails.properties[0].livingType)}
            </div>
          ) : null}
          {propertyDetails.properties[0].poolType ? (
            <div className="bg-grays-25 text-[13px] font-normal text-grays-900 text-sm py-2 px-3 rounded-[100px] leading-[19.5px]">
              {formatText(propertyDetails.properties[0].poolType)}
            </div>
          ) : null}
          {propertyDetails.properties[0].propertyType ? (
            <div className="bg-grays-25 text-[13px] font-normal text-grays-900 text-sm py-2 px-3 rounded-[100px] leading-[19.5px]">
              {formatText(propertyDetails.properties[0].propertyType)}
            </div>
          ) : null}
        </div>
        <div
          className={`w-full transition-all duration-1000 pt-4 text-body_m text-2xl leading-body_m text-grays-700 ${
            showFullDescription ? "max-h-[700px]" : ""
          }`}
        >
          {showFullDescription
            ? propertyDetails.listing.description
            : propertyDetails.listing.description.length > descriptionMaxLength
              ? propertyDetails.listing.description.substring(
                  0,
                  descriptionMaxLength,
                ) + "..."
              : propertyDetails.listing.description}
        </div>

        <div className="pt-4">
          <p className="bg-grays-25 rounded-2xl pl-3 py-3 leading-body_s">
            <span className="text-grays-700">
              Some info has been automatically translated.
            </span>
            &nbsp;
            <span className="text-grays-1000 underline cursor-pointer">
              Show original.
            </span>
          </p>
        </div>

        {/*<dialog id="my_modal_3" ref={openModalRef} className="modal">*/}
        {/*  <div className="modal-box">*/}
        {/*    <form method="dialog">*/}
        {/*      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">*/}
        {/*        ✕*/}
        {/*      </button>*/}
        {/*    </form>*/}
        {/*    <h3 className="font-bold text-lg">About this Property</h3>*/}
        {/*    <p className="py-4">{propertyDetails.listing.description}</p>*/}
        {/*  </div>*/}
        {/*</dialog>*/}

        <div className="pt-4">
          {propertyDetails.listing.description.length >
            descriptionMaxLength && (
            <TheButton
              variant="tertiary"
              className="max-w-[292px] flex items-center px-[41.33px] text-grays-1000 bg-transparent border border-grays-1000 rounded-2xl py-[13.5px]"
              onClick={handleOpenModal}
            >
              {!showFullDescription ? (
                <div
                  className={`flex justify-center items-center transition-transform duration-300 ease-in-out`}
                >
                  <Icon
                    iconName="arrow"
                    fill="none"
                    stroke="#000000"
                    viewBox="0 0 13 13"
                    width="13"
                  />
                </div>
              ) : (
                <div
                  className={`flex justify-center items-center transition-transform duration-300 ease-in-out`}
                >
                  <div style={{ transform: "rotate(180deg)" }}>
                    <Icon
                      iconName="arrow"
                      fill="none"
                      stroke="#000000"
                      viewBox="0 0 13 13"
                      width="13"
                    />
                  </div>
                </div>
              )}
              {!showFullDescription ? "Show Full Description" : "Show less"}
            </TheButton>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AboutProperty;
