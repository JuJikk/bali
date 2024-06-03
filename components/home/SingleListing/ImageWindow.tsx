import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { isValidImageFilename } from "@/utils/validImageKey";
import { ImageRes } from "@/models/basic";

type ImageWindowProps = {
  images: ImageRes[];
  setVisible: Dispatch<SetStateAction<boolean>>;
};

function ImageWindow({ images, setVisible }: ImageWindowProps) {
  return (
    <div className="ImageWindowEl pointer-events-auto z-50 fixed top-0  flex flex-col items-center bg-grays-0 w-[100vw] h-[100dvh]">
      <div className="flex justify-between w-full p-4">
        <button
          onClick={() => setVisible(false)}
          type="button"
          className="flex items-center justify-center p-2.5  rounded-full border-grays-200 max-w-9 max-h-9 hover:bg-grays-100"
        >
          <Icon iconName="arrow-left" fill="none" stroke="black" />
        </button>
      </div>

      <div className="flex flex-col w-full items-center overflow-y-auto pt-4 pb-16">
        {images &&
          images.map((el) => (
            <div
              // className="overflow-hidden"
              key={`IWS_${el.updatedAt}`}
            >
              {isValidImageFilename(el.key) && (
                <Image
                  src={"/images/" + el.key}
                  // className="w-full h-full object-cover"
                  alt=""
                  width={700}
                  height={1}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ImageWindow;
