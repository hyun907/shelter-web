import { ReactNode } from "react";
import { create } from "zustand";

export type BottomSheetOptions = {
  onBackdropClick?: () => void;
  ariaLabel?: string;
};

interface BottomSheetStore {
  isOpen: boolean;
  content: ReactNode | null;
  options: BottomSheetOptions | null;
  open: (content: ReactNode, options?: BottomSheetOptions) => void;
  close: () => void;
}

export const useBottomSheetStore = create<BottomSheetStore>(set => ({
  isOpen: false,
  content: null,
  options: null,
  open: (content, options) => set({ isOpen: true, content, options: options ?? null }),
  close: () => set({ isOpen: false, content: null, options: null })
}));
