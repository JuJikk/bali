import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import Image from "next/image";
import LikeButton from "@/components/ui/LikeButton";
import Icon from "@/components/ui/Icon";
import { useRouter } from "next/navigation";
import { ImageRes } from "@/models/basic";
import { isValidImageFilename } from "@/utils/validImageKey";

type GridImagesAdaptiveProps = {
  images: ImageRes[];
  setIsGaleryVisible: Dispatch<SetStateAction<boolean>>;
};

function GridImagesAdaptive({
  images,
  setIsGaleryVisible,
}: GridImagesAdaptiveProps) {
  const router = useRouter();
  const [clickedLikedBtn, setClickLikeButton] = useState<boolean>(false);
  const [currSlide, setCurrSlide] = useState<number>(0);
  const slidesListRef = useRef<HTMLButtonElement[]>([]);
  const slideControlRef = useRef<HTMLDivElement | null>(null);

  const handleOpenGalery = () => {
    setIsGaleryVisible(true);
  };

  const handleLikeBtnClick = () => {
    setClickLikeButton((prev) => !prev);
  };

  const HandleArrowBack = () => {
    router.back();
  };

  const ScrollHandler = () => {
    if (slideControlRef.current && slidesListRef.current.length > 0) {
      const scrollProgess = Math.trunc(
        Math.round(slideControlRef.current.scrollLeft)
      );
      const slideWidth = slidesListRef.current[0].offsetWidth;
      if (scrollProgess % slideWidth === 0) {
        setCurrSlide(scrollProgess / slideWidth);
      }
    }
  };

  return (
    <div className="relative flex justify-center lg:hidden overflow-hidden">
      <div
        className="flex items-start overflow-x-auto snap-x snap-mandatory h-fit w-full carousel"
        style={{ scrollbarWidth: "none" }}
        onScroll={ScrollHandler}
        ref={slideControlRef}
      >
        {images &&
          images.map((el, index: number) => (
            <button
              ref={(element) => {
                if (element) slidesListRef.current[index] = element;
              }}
              onClick={handleOpenGalery}
              className="flex justify-center items-center carousel-item w-[100%]"
              key={`GIA_${el.updatedAt}`}
            >
              {isValidImageFilename(el.key) && (
                <Image
                  src={"/images/" + el.key}
                  className="w-full"
                  alt=""
                  width={700}
                  height={700}
                />
              )}
            </button>
          ))}
      </div>

      <div className="pointer-events-none absolute top-[0px] left-[0px] flex p-4 items-start justify-between h-full w-full max-w-700">
        <div className="flex items-center gap-4 h-fit">
          <button
            onClick={HandleArrowBack}
            type="button"
            aria-label={clickedLikedBtn ? "Saved" : "Unsaved"}
            className="pointer-events-auto flex items-center justify-center p-2.5 rounded-full bg-grays-0 max-w-25 max-h-25"
          >
            <Icon iconName="arrow-left" fill="none" stroke="#000" />
          </button>
        </div>

        <div className="flex items-center gap-4 h-fit">
          <button
            type="button"
            aria-label={clickedLikedBtn ? "Saved" : "Unsaved"}
            className="pointer-events-auto flex items-center justify-center p-2.5 rounded-full bg-grays-0 max-w-25 max-h-25"
          >
            <Icon iconName="printer" fill="none" stroke="#000" />
          </button>

          <button
            type="button"
            aria-label={clickedLikedBtn ? "Saved" : "Unsaved"}
            className="pointer-events-auto flex items-center justify-center p-2 rounded-full bg-grays-0 max-w-20 max-h-20"
            onClick={handleLikeBtnClick}
          >
            <LikeButton classType={clickedLikedBtn ? "active" : ""} />
          </button>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-[20px] right-[20px] pt-2 pb-2 pl-4 pr-4 rounded-lg text-grays-0 text-body_l"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      >
        {currSlide + 1}/{images.length}
      </div>
    </div>
  );
}

export default GridImagesAdaptive;
