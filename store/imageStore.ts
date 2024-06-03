import { arrayMoveImmutable as arrayMove } from "array-move";
import { create } from "zustand";

type ImageType = {
  id: string;
  src: string;
  selected?: boolean;
};

type ImageStore = {
  images: ImageType[];
  addImages: (newImages: ImageType[]) => void;
  toggleImageSelection: (id: string) => void;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  removeImage: (index: number) => void;
};

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  addImages: (newImages) =>
    set((state) => ({ images: [...state.images, ...newImages] })),
  toggleImageSelection: (id) =>
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, selected: !img.selected } : img
      ),
    })),
  moveImage: (dragIndex, hoverIndex) =>
    set((state) => {
      const newImages = arrayMove(state.images, dragIndex, hoverIndex);
      return { images: newImages };
    }),
  removeImage: (index) =>
    set((state) => {
      const newImages = state.images.filter((_, i) => i !== index);
      return { images: newImages };
    }),
}));
