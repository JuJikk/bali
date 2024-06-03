import diamndsImage from "@/public/images/diamonds.png";
import Icon from "@/components/ui/Icon";
import { PropertiesDetails } from "@/models/basic";
import Image from "next/image";
import { useCurrencyStore } from "@/store/currencyStore";
type HeadElAdaptiveProps = { propertyDetails: PropertiesDetails };
import Container from "@/components/container/Container";
import {formatPrices, getPrice} from "@/utils/calculations";

function HeadElAdaptive({ propertyDetails }: HeadElAdaptiveProps) {
  const { currentCurrency } = useCurrencyStore();

  const price = getPrice(propertyDetails.firstContent.prices, currentCurrency.name);
  const pricesIdr = formatPrices(propertyDetails.firstContent.prices, "MONTHLY");


  return (
      <Container>
        <div className="flex lg:hidden justify-between items-center pt-6 pb-6">
          <div className="">
            <h1 className="text-2xl text-grays-1000 font-bold">
              {propertyDetails?.listing?.title}
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {propertyDetails?.listing?.leasehold && (
                  <div className="flex items-center bg-grays-1000 text-grays-0 text-xs font-light py-1 px-3 rounded-[100px]">
                    Leasehold
                  </div>
              )}
              <div className="flex items-center bg-gray-200 text-gray-700 text-xs font-normal px-3 py-1 border border-grays-1000 rounded-[100px]">
                {propertyDetails?.construction &&
                    propertyDetails.construction[0]?.status && <div>OFF PLAN</div>}
              </div>
              <div className="flex items-center justify-center text-gray-500">
                <Icon iconName="map2" fill="none" stroke="black" />
                <div className="px-2 text-grays-700 text-sm">
                  {propertyDetails?.listing?.location}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4"></div>
        </div>

        <div className="lg:hidden flex flex-col gap-2 justify-between items-start pt-4 pb-4 border-t border-grays-100">
          <div className="hidden lg:flex items-center">
            <div className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-dark_blue flex items-center justify-center overflow-hidden">
              {propertyDetails.firstContent?.owner?.image ? (
                  <Image
                      src={"/images/owner1.jpeg"}
                      alt="owner"
                      width={32}
                      height={19}
                      className="object-cover w-auto"
                  />
              ) : (
                  <Image
                      src={diamndsImage}
                      alt="diamonds"
                      width={32}
                      height={19}
                      className="object-contain -translate-y-[1px] scale-95"
                  />
              )}
            </div>
            <div className="pl-[10px]">
              <span className="text-grays-700">Listed by</span>
              <span className="text-black"> {propertyDetails.firstContent?.owner?.name}</span>
            </div>
          </div>

          <div className="flex gap-3">
          <span className="text-xl leading-h3 text-grays-500">
            {pricesIdr.formattedPrice}
          </span>
            <span className="text-xl leading-h3 text-grays-1000 font-semibold">
            {currentCurrency.shortName}
              {price}
          </span>
          </div>
        </div>
      </Container>
  );
}

export default HeadElAdaptive;
