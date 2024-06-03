import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { ImageRes } from "@/models/basic";
import { isValidImageFilename } from "@/utils/validImageKey";
import Container from "@/components/container/Container";


type GridImagesProps = {
  images: ImageRes[];
  setIsGaleryVisible: Dispatch<SetStateAction<boolean>>;
};

function GridImages({ images, setIsGaleryVisible }: GridImagesProps) {
  const handleOpenGalery = () => {
    setIsGaleryVisible(true);
  };

  return (
      <Container>
        {/* <div className="hidden sm:block w-full"> */}
        <div className="hidden lg:block w-full">
          <div className="grid grid-cols-4 grid-rows-2 gap-4 w-full h-full max-h-[580px] min-h-[520px]">
            <div
                className={`bg-blue-300 flex justify-center items-center text-white 
							${images.length > 1 ? "col-span-2 row-span-2" : "col-span-4 row-span-4"}`}
            >
              <button
                  className="w-full h-full rounded-2xl overflow-hidden"
                  onClick={handleOpenGalery}
              >
                {images[0] && isValidImageFilename(images[0].key) && (
                    <Image
                        src={"/images/" + images[0].key}
                        className="w-full h-full object-cover"
                        alt=""
                        width={632}
                        height={580}
                    />
                )}
              </button>
            </div>

            <div
                className={`
           flex justify-center items-center text-white   	${
                    images.length > 2
                        ? "col-span-2 row-span-1"
                        : "col-span-2 row-span-2"
                }`}
            >
              <button
                  className="w-full h-full rounded-2xl overflow-hidden"
                  onClick={handleOpenGalery}
              >
                {images[1] && isValidImageFilename(images[1].key) && (
                    <Image
                        src={"/images/" + images[1].key}
                        className="w-full h-full object-cover"
                        alt=""
                        width={632}
                        height={300}
                    />
                )}
              </button>
            </div>

            <div
                className={`flex justify-center items-center text-white ${
                    images.length > 3
                        ? "col-span-1 row-span-1"
                        : "col-span-2 row-span-1"
                }`}
            >
              <button
                  className=" w-full h-full rounded-2xl overflow-hidden bg-grays-100"
                  onClick={handleOpenGalery}
              >
                {images[2] && isValidImageFilename(images[2].key) && (
                    <Image
                        src={"/images/" + images[2].key}
                        className="w-full h-full object-cover"
                        alt=""
                        width={308}
                        height={264}
                    />
                )}
              </button>
            </div>
            <div className="col-span-1 flex justify-center items-center text-white">
              <button
                  onClick={handleOpenGalery}
                  className=" w-full h-full rounded-2xl overflow-hidden relative bg-grays-100"
              >
                {images[3] && isValidImageFilename(images[3].key) && (
                    <Image
                        src={"/images/" + images[3].key}
                        className="w-full h-full object-cover"
                        alt=""
                        width={308}
                        height={264}
                    />
                )}
                {images && images.length > 4 && (
                    // images.length > 4
                    // &&
                    <button className="cursor-pointer absolute top-0 left-0  bg-grays-1000 bg-opacity-40 w-full h-full flex justify-center items-center">
                      <p className="heading_h4 text-grays-0 max-w-[152px] text-center">
                        Show {images.length - 4} more photos
                      </p>
                    </button>
                )}
              </button>
            </div>
          </div>
        </div>
      </Container>
  );
}

export default GridImages;
