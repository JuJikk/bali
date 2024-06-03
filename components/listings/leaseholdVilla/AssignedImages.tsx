import Icon from "@/components/ui/Icon";
import { PropertyFormValues } from "@/models/formikModels";
import { useImageStore } from "@/store/imageStore";
import { FormikProps } from "formik";
import React, { FC } from "react";
import Image from "next/image";

type AssignedImagesProps = {
  closeModal: () => void;
  formik: FormikProps<PropertyFormValues>;
};

const AssignedImages: FC<AssignedImagesProps> = ({ closeModal, formik }) => {
  const { images } = useImageStore();

  const selectedImages = formik.values.images
    .map((selected) => images.find((image) => image.id === selected.key))
    .filter((image): image is NonNullable<typeof image> => image !== undefined);

  const renderImage = (image: { id: string; src: string }, index: number) => (
    <div
      key={image.id}
      className={`w-8 h-8 border border-grays-0 rounded-lg ${
        index > 0 ? "-ml-5" : ""
      }`}
    >
      <Image
        src={image.src}
        alt="Selected Image"
        width={32}
        height={32}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );

  const renderGreyBox = (index: number, content: React.ReactNode = null) => (
    <div
      key={`grey-box-${index}`}
      className={`w-8 h-8  border border-grays-0 rounded-lg flex items-center justify-center ${
        index > 0 ? "-ml-5" : ""
      } ${
        index === 0
          ? "bg-grays-600"
          : index === 1
          ? "bg-grays-500"
          : "bg-grays-400"
      }`}
    >
      {content}
    </div>
  );

  return (
    <button
      type="button"
      className="flex gap-3 items-center"
      onClick={closeModal}
    >
      <div className="flex">
        {selectedImages.length === 0 && (
          <>
            {renderGreyBox(0)}
            {renderGreyBox(1)}
            {renderGreyBox(2)}
          </>
        )}
        {selectedImages.length === 1 && (
          <>
            {renderImage(selectedImages[0], 0)}
            {renderGreyBox(1)}
            {renderGreyBox(2)}
          </>
        )}
        {selectedImages.length === 2 && (
          <>
            {renderImage(selectedImages[0], 0)}
            {renderImage(selectedImages[1], 1)}
            {renderGreyBox(2)}
          </>
        )}
        {selectedImages.length === 3 && (
          <>
            {renderImage(selectedImages[0], 0)}
            {renderImage(selectedImages[1], 1)}
            {renderImage(selectedImages[2], 2)}
          </>
        )}
        {selectedImages.length >= 4 && (
          <>
            {renderImage(selectedImages[0], 0)}
            {renderImage(selectedImages[1], 1)}
            {renderGreyBox(
              2,
              <span className="text-grays-0 body_xs">
                +{selectedImages.length - 2}
              </span>
            )}
          </>
        )}
      </div>
      <p className="body_xs">{formik.values.images.length} images assigned</p>
      <div className="rotate-[270deg] w-fit">
        <Icon
          iconName="arrow"
          fill="none"
          stroke="#3C3E3D"
          viewBox="0 0 16 16"
          width="16"
        />
      </div>
    </button>
  );
};

export default AssignedImages;
