import { create } from "zustand";
import type { ReactNode } from "react";

export type ModalOptions = {
  onBackdropClick?: () => void;
  ariaLabel?: string;
};

interface ModalStore {
  isOpen: boolean;
  content: ReactNode | null;
  options: ModalOptions | null;
  open: (content: ReactNode, options?: ModalOptions) => void;
  close: () => void;
  clear: () => void;
}

export const useModalStore = create<ModalStore>(set => ({
  isOpen: false,
  content: null,
  options: null,
  open: (content, options) => set({ isOpen: true, content, options: options ?? null }),
  close: () => set({ isOpen: false, content: null, options: null }),
  clear: () => set({ isOpen: false, content: null, options: null })
}));
