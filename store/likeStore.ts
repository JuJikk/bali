import { create } from "zustand";

type LikeStore = {
  likedCards: { [key: string]: boolean };
  likeCount: number;
  toggleLike: (id: number) => void;
};

export const useLikeStore = create<LikeStore>((set) => ({
  likedCards: {},
  likeCount: 0,
  toggleLike: (id: number) =>
    set((state) => {
      const isCurrentlyLiked = !!state.likedCards[id];
      const newLikedCards = { ...state.likedCards, [id]: !isCurrentlyLiked };
      const newLikeCount = Object.values(newLikedCards).filter(Boolean).length;
      return { likedCards: newLikedCards, likeCount: newLikeCount };
    }),
}));
