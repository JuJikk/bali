import Container from "@/components/container/Container";
import SkeletonItem from "@/components/ui/skeletons/SkeletonItem";
import { text } from "@/const/text";
import React from "react";

const ListingsLoading = () => {
  const skeletonItems = Array.from({ length: 4 }, (el, i) => (
    <SkeletonItem key={i} />
  ));
  const language = "en";
  return (
    <Container>
      <div
        className={`flex lg:grid flex-col-reverse lg:grid-cols-[60%_40%] gap-0 lg:gap-12`}
      >
        <div className="flex flex-col py-0 lg:py-10 gap-6 lg:gap-11 -mx-5 lg:-ml-10 lg:-mr-6 -translate-y-24 z-10 lg:z-auto lg:translate-y-0 bg-grays-0 rounded-t-2xl lg:rounded-none">
          <div className="flex lg:hidden items-center justify-center pt-4 -mb-3">
            <div className="w-[50px] h-[5px] bg-grays-50 rounded-[100px]"></div>
          </div>
          <div className="flex justify-between items-center px-5 lg:px-0">
            <h2 className="heading_h6 lg:heading_h5">
              {text.listingSection.title
                .map((el, i) => {
                  if (i === 0) {
                    return `${el[language]} 3256 `;
                  } else if (i === 1) {
                    return `${el[language]} 46 `;
                  } else {
                    return el[language];
                  }
                })
                .join("")}
            </h2>
            <div className="bg-grays-50 w-[50px] lg:w-[100px] h-[45px] rounded-[10px]"></div>
          </div>
          <div className="grid grid-col-1 lg:grid-cols-2 gap-6 max-w-[1320px] px-5 lg:px-0">
            {skeletonItems.map((el, i) => (
              <React.Fragment key={i}>{el}</React.Fragment>
            ))}
          </div>
        </div>
        <div
          className={`h-full min-h-[600px] lg:h-[calc(100vh-92px)] top-0 -mr-5 -ml-5 lg:ml-0 lg:-mr-8`}
        >
          <div className="h-[70vh] lg:h-[870px] bg-grays-50 w-full relative">
            <div className="absolute top-[188px] left-[90px] w-[70px] h-[26px] py-1 px-3 rounded-[100px] bg-grays-0 flex items-center justify-center  shadow-marker whitespace-nowrap">
              <p className="text-grays-800 body_xs !text-xs flex items-center gap-2">
                <span className="text-grays-1000 body_l !text-xs !leading-[18px]">
                  $
                </span>
                233K
              </p>
            </div>
            <div className="absolute top-[313px] left-[145px] w-[70px] h-[26px] py-1 px-3 rounded-[100px] bg-grays-0 flex items-center justify-center  shadow-marker whitespace-nowrap">
              <p className="text-grays-800 body_xs !text-xs flex items-center gap-2">
                <span className="text-grays-1000 body_l !text-xs !leading-[18px]">
                  $
                </span>
                233K
              </p>
            </div>
            <div className="absolute top-[520px] right-[89px] w-[70px] h-[26px] py-1 px-3 rounded-[100px] bg-grays-0 flex items-center justify-center  shadow-marker whitespace-nowrap">
              <p className="text-grays-800 body_xs !text-xs flex items-center gap-2">
                <span className="text-grays-1000 body_l !text-xs !leading-[18px]">
                  $
                </span>
                233K
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingsLoading;
