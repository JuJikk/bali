import { DndProvider, useDrag, useDrop } from "react-dnd";
import Image from "next/image";
import React, { memo } from "react";
import Icon from "@/components/ui/Icon";

export type ImageType = {
  id: string;
  src: string;
};

const ItemType = "IMAGE";

const ImageItem: React.FC<{
  image: ImageType;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  removeImage: (index: number) => void;
  length: number;
}> = memo(({ image, index, moveImage, removeImage, length }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      className={`relative rounded-2xl ${
        length === 1 ? "flex-1 w-full h-[145px]" : "w-[92px] h-[92px] "
      }`}
    >
      <Image
        width={92}
        height={92}
        src={image.src}
        alt={`uploaded-${index}`}
        className="w-full h-full object-cover rounded-2xl"
      />
      <button
        type="button"
        onClick={() => removeImage(index)}
        className="absolute top-0 right-0 bg-func-red rounded-full"
      >
        <Icon iconName="close" stroke="white" width="16" />
      </button>
      <style jsx>{`
        .dragging {
          border-radius: 16px;
        }
      `}</style>
    </div>
  );
});

ImageItem.displayName = "ImageItem";

export default ImageItem;
