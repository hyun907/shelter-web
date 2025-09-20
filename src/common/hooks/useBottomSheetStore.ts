import type { ReactNode } from "react";
import { create } from "zustand";

export type BottomSheetOptions = {
  onBackdropClick?: () => void;
  ariaLabel?: string;
};

interface BottomSheetStore {
  isOpen: boolean;
  content: ReactNode | null;
  options: BottomSheetOptions | null;
  translateY: number;
  open: (content: ReactNode, options?: BottomSheetOptions) => void;
  openAndExpand: (content: ReactNode, options?: BottomSheetOptions) => void;
  setTranslateY: (translateY: number) => void;
  close: () => void;
  expandToTop: (() => void) | null;
  collapseToBottom: (() => void) | null;
}

export const useBottomSheetStore = create<BottomSheetStore>(set => ({
  isOpen: false,
  content: null,
  options: null,
  translateY: 0,
  open: (content, options) => set({ isOpen: true, content, options: options ?? null }),
  openAndExpand: (content, options) => {
    set({ isOpen: true, content, options: options ?? null, translateY: 0 });
  },
  setTranslateY: translateY => set({ translateY }),
  close: () => set({ isOpen: false, content: null, options: null }),
  expandToTop: null,
  collapseToBottom: null
}));
