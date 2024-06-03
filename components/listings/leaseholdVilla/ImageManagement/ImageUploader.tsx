import React, { useCallback, FC } from "react";
import { useDropzone } from "react-dropzone";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormikProps } from "formik";
import { FormValues } from "@/models/formikModels";
import { useImageStore } from "@/store/imageStore";
import Icon from "@/components/ui/Icon";
import ImageItem, { ImageType } from "./ImageItem";

type ImageUploaderProps = {
  formik: FormikProps<FormValues>;
};

const ImageUploader: FC<ImageUploaderProps> = ({ formik }) => {
  const { images, addImages, moveImage, removeImage } = useImageStore();

  const updateFormikImages = useCallback(() => {
    const formattedImages = images.map(
      (image: { id: string; src: string }, index: number) => ({
        place: index + 1,
        key: image.id,
        year: new Date().getFullYear(),
        month: new Date()
          .toLocaleString("default", { month: "long" })
          .toUpperCase(),
        thumbnail: index === 0,
        src: image.src,
      })
    );
    formik.setFieldValue("images", formattedImages);
  }, [formik, images]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages: ImageType[] = [];
      acceptedFiles.forEach((file) => {
        const existingImage = images.find((img) => img.id === file.name);
        if (existingImage) {
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            newImages.push({ id: file.name, src: reader.result as string });
            if (newImages.length === acceptedFiles.length) {
              addImages(newImages);
              updateFormikImages();
            }
          }
        };
        reader.readAsDataURL(file);
      });
    },
    [addImages, images, updateFormikImages]
  );

  const moveImageHandler = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      moveImage(dragIndex, hoverIndex);
      updateFormikImages();
    },
    [moveImage, updateFormikImages]
  );

  const removeImageHandler = useCallback(
    (index: number) => {
      removeImage(index);
      updateFormikImages();
    },
    [removeImage, updateFormikImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div className="w-full flex flex-wrap gap-4">
      <div
        className={`flex gap-3 w-full ${
          images.length === 1 ? "justify-between w-full" : "flex-wrap"
        }`}
      >
        {images.map((image, index) => (
          <ImageItem
            key={image.id}
            index={index}
            image={image}
            moveImage={moveImageHandler}
            removeImage={removeImageHandler}
            length={images.length}
          />
        ))}
        <label
          {...getRootProps()}
          className={`flex-1 relative flex justify-center cursor-pointer border border-dashed border-grays-200 rounded-[10px]  placeholder:text-grays-500 body_xs flex-col items-center ${
            isDragActive ? " bg-grays-50 transition-all" : "bg-grays-0"
          } custom-dropzone ${
            images.length > 1 ? "w-full h-[92px] px-2 py-2" : "px-[18px] py-6"
          } ${images.length === 1 ? "max-w-[197px]" : ""}`}
        >
          <input {...getInputProps()} hidden />
          <div className="flex flex-col items-center justify-center gap-2.5">
            <Icon
              iconName="gallery-export"
              fill="none"
              stroke="black"
              width="24"
            />
            <p className="body_xs text-grays-500 text-center">
              {images.length > 0
                ? "Upload More"
                : "Upload high-quality photos of your villa. Ensure good lighting and clarity to showcase your property's best features."}
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};

const ImageUploaderWrapper: FC<ImageUploaderProps> = (props) => (
  <DndProvider backend={HTML5Backend}>
    <ImageUploader {...props} />
  </DndProvider>
);

export default ImageUploaderWrapper;
