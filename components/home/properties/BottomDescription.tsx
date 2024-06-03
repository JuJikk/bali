import Image from "next/image";
import diamndsImage from "@/public/images/diamonds.png";
import Icon from "@/components/ui/Icon";
import Container from "@/components/container/Container";
import { FC } from "react";
import { PropertiesDetails } from "@/models/basic";

type PropertyProps = {
  propertyDetails: PropertiesDetails;
};

const BottomDescription: FC<PropertyProps> = ({ propertyDetails }) => {
  return (
    <Container>
      <div className="hidden lg:flex w-full flex-wrap gap-y-11 justify-between items-center bg-grays-0 py-20">
        <div>
          <div className="flex relative">
            <div className="w-20 h-20 min-w-20 min-h-20 rounded-full bg-dark_blue flex items-center justify-center overflow-hidden">
              {propertyDetails.firstContent?.owner?.image ? (
                <Image
                  src={"/images/owner1.jpeg"}
                  alt="owner"
                  width={90}
                  height={90}
                  className="object-cover w-auto"
                />
              ) : (
                <Image
                  src={diamndsImage}
                  alt="diamonds"
                  width={90}
                  height={90}
                  className="object-contain -translate-y-[1px] scale-95"
                />
              )}
            </div>
            <div className="absolute bottom-0 left-[58px]">
              <Icon
                iconName="verify"
                fill="#08b1ff"
                stroke="#FFF"
                width="26px"
                viewBox="0 0 26 26"
              />
            </div>

            <div className="pt-4 pl-4.5">
              <p className="text-grays-900 max-w-36 font-bold">
                {propertyDetails.firstContent?.owner?.name}
              </p>
              <p className="text-grays-600">Agency</p>
            </div>
          </div>
          <div className="pt-8">
            <p className="text-grays-1000 text-body_m ">
              <span className="text-grays-700 font-light">Speaks</span> English,
              French
              <span className="text-grays-700 font-light">&nbsp;&&nbsp;</span>
              Spanish
            </p>
          </div>
          <div className="pt-8 flex justify-between gap-x-4">
            <div className="flex items-center gap-x-6 px-11 py-3.5 box-border border border-grays-1000 rounded-2xl">
              <div className="min-w-6 cursor-pointer">
                <Icon iconName="whatsapp" viewBox="0 0 25 24" width="25" />
              </div>
              <div className="text-body_m whitespace-nowrap">
                +62 811 3800 9566
              </div>
            </div>
            <div className="min-w-14 rounded-2xl flex justify-center items-center border border-grays-1000">
              <div className="max-w-6 cursor-pointer">
                <Icon iconName="mail" fill="none" stroke="#292D32" />
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex gap-20 justify-center py-6 md:pl-20 pl-10 md:pr-20 pr-10 bg-grays-25 rounded-2xl w-full xl:w-fit ">
          <div className="items-center md:items-start flex md:flex-col gap-x-4  w-fit">
            <h3 className="md:font-bold text-grays-1000 text-h3 leading-h3">
              {propertyDetails.listing.leaseDuration} years
            </h3>
            <div className="text-body_s font-light text-grays-700">
              Lease duration <br />+ extension guaranteed
            </div>
          </div>
          <div className="items-center md:items-start  flex md:flex-col gap-x-4  w-fit">
            <h3 className="md:font-bold text-grays-1000 text-h3 leading-h3">
              {propertyDetails?.construction &&
                propertyDetails.construction[0]?.completionYear}
            </h3>
            <div className="text-body_s font-light text-grays-700">
              Year Built
            </div>
          </div>
          <div className="items-center md:items-start  flex md:flex-col gap-x-4  w-fit">
            <h3 className="md:font-bold text-grays-1000 text-h3 leading-h3">
              22%
            </h3>
            <div className="text-body_s font-light text-grays-700">
              Annual ROI*
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BottomDescription;
