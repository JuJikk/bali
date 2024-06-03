import React, { FC, useState } from "react";
import { FormikProps } from "formik";
import { PropertyFormValues } from "@/models/formikModels";
import TheButton from "@/components/ui/TheButton";
import Icon from "@/components/ui/Icon";
import Image from "next/image";
import { useImageStore } from "@/store/imageStore";

type ImageSelectorModalProps = {
  villaName: string;
  formik: FormikProps<PropertyFormValues>;
  onClose: () => void;
  onSave: () => void;
};

const ImageSelectorModal: FC<ImageSelectorModalProps> = ({
  villaName,
  formik,
  onClose,
  onSave,
}) => {
  const { images } = useImageStore();

  const [localSelectedImages, setLocalSelectedImages] = useState<{
    mainImage: string;
    additionalImages: string[];
  }>({
    mainImage: formik.values.images[0]?.key || "",
    additionalImages: formik.values.images.map((img) => img.key).slice(1),
  });

  const handleImageClick = (id: string) => {
    if (localSelectedImages.mainImage === id) {
      const newAdditionalImages = localSelectedImages.additionalImages.filter(
        (imgId) => imgId !== id
      );
      const newMainImage = newAdditionalImages[0] || "";
      const newAdditionalImagesWithoutMain = newAdditionalImages.slice(1);

      setLocalSelectedImages({
        mainImage: newMainImage,
        additionalImages: newAdditionalImagesWithoutMain,
      });
    } else if (localSelectedImages.additionalImages.includes(id)) {
      setLocalSelectedImages((prev) => ({
        ...prev,
        additionalImages: prev.additionalImages.filter((imgId) => imgId !== id),
      }));
    } else if (!localSelectedImages.mainImage) {
      setLocalSelectedImages((prev) => ({
        ...prev,
        mainImage: id,
      }));
    } else {
      setLocalSelectedImages((prev) => ({
        ...prev,
        additionalImages: [...prev.additionalImages, id],
      }));
    }
  };

  const handleSave = () => {
    const selectedImages = localSelectedImages.mainImage
      ? [
          {
            place: 1,
            key: localSelectedImages.mainImage,
            year: new Date().getFullYear(),
            month: new Date()
              .toLocaleString("default", { month: "long" })
              .toUpperCase(),
            thumbnail: true,
            src:
              images.find((img) => img.id === localSelectedImages.mainImage)
                ?.src || "",
          },
          ...localSelectedImages.additionalImages.map((imgId, index) => ({
            place: index + 2,
            key: imgId,
            year: new Date().getFullYear(),
            month: new Date()
              .toLocaleString("default", { month: "long" })
              .toUpperCase(),
            thumbnail: false,
            src: images.find((img) => img.id === imgId)?.src || "",
          })),
        ]
      : [];

    formik.setFieldValue("images", selectedImages);
    onSave();
  };

  return (
    <div
      className="fixed inset-0 bg-grays-1000 bg-opacity-50 flex justify-center items-center backdrop-blur-s z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-grays-0 p-6 rounded-2xl w-[454px] flex flex-col items-center gap-4 shadow-user-menu"
      >
        <button className="self-end" type="button" onClick={onClose}>
          <Icon iconName="close" stroke="#292D32" />
        </button>
        <h1 className="heading_h6 text-grays-800">{villaName}</h1>
        <h3 className="heading_h4">Assign Images</h3>
        <p className="body_m text-grays-800 text-center">
          First, pick the featured image of this villa, then choose additional
          pictures for the gallery.
        </p>
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative w-[92px] h-[92px] rounded-2xl overflow-hidden  ${
                localSelectedImages.mainImage === image.id ||
                localSelectedImages.additionalImages.includes(image.id)
                  ? " border-[3px] border-grays-500"
                  : ""
              }`}
            >
              <Image
                src={image.src}
                alt={`Villa Image ${index + 1}`}
                width={92}
                height={92}
                className={`cursor-pointer w-full h-full object-cover`}
                onClick={() => handleImageClick(image.id)}
              />
              {localSelectedImages.mainImage === image.id && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Icon iconName="star" width="23" viewBox="0 0 16 17" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <TheButton
            type="button"
            onClick={handleSave}
            variant="secondary"
            className="w-full !body_mb"
          >
            Continue
          </TheButton>
          <TheButton
            type="button"
            onClick={onClose}
            variant="tertiary"
            className="w-full !body_mb text-grays-900"
          >
            Cancel
          </TheButton>
        </div>
      </div>
    </div>
  );
};

export default ImageSelectorModal;
