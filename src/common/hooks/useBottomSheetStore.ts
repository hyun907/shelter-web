import type { ReactNode } from "react";
import { create } from "zustand";

interface BottomSheetStore {
  content: ReactNode | null;
  ariaLabel: string | null;
  translateY: number;
  setContent: (content: ReactNode, ariaLabel?: string) => void;
  expandToTop: (() => void) | null;
  collapseToBottom: (() => void) | null;
}

export const useBottomSheetStore = create<BottomSheetStore>(set => ({
  content: null,
  ariaLabel: null,
  translateY: 0,
  setContent: (content, ariaLabel) => set({ content, ariaLabel: ariaLabel ?? null }),
  expandToTop: null,
  collapseToBottom: null
}));
