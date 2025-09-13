import { useCallback, useEffect, useRef, useState } from "react";

export type BottomSheetInteraction = {
  sheetRef: React.RefObject<HTMLDivElement>;
  handleRef: React.RefObject<HTMLDivElement>;
  translateY: number;
  isDragging: boolean;
  measured: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
};

export function useBottomSheetInteraction(peekHeight: number) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const startTranslateRef = useRef(0);
  const maxTranslateRef = useRef(0);

  const initialTranslate = Math.max(Math.round(window.innerHeight * 0.7) - peekHeight, 0);
  const [translateY, setTranslateY] = useState(initialTranslate);
  const [isDragging, setIsDragging] = useState(false);
  const [measured, setMeasured] = useState(false);

  const recalc = useCallback(() => {
    const el = sheetRef.current;
    if (!el) return;
    const h = el.getBoundingClientRect().height;
    const maxTranslate = Math.max(h - peekHeight, 0);
    maxTranslateRef.current = maxTranslate;
    setTranslateY(maxTranslate);
    setMeasured(true);
  }, [peekHeight]);

  useEffect(() => {
    recalc();
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recalc]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    setIsDragging(true);
    startYRef.current = e.clientY;
    startTranslateRef.current = translateY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dy = e.clientY - startYRef.current;
    const next = Math.min(Math.max(startTranslateRef.current + dy, 0), maxTranslateRef.current);
    setTranslateY(next);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const over = maxTranslateRef.current;
    const snapTo = translateY < over / 2 ? 0 : over;
    setTranslateY(snapTo);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    setIsDragging(true);
    const touch = e.touches[0];
    startYRef.current = touch.clientY;
    startTranslateRef.current = translateY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    const touch = e.touches[0];
    const dy = touch.clientY - startYRef.current;
    const next = Math.min(Math.max(startTranslateRef.current + dy, 0), maxTranslateRef.current);
    setTranslateY(next);
  };

  const onTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const over = maxTranslateRef.current;
    const snapTo = translateY < over / 2 ? 0 : over;
    setTranslateY(snapTo);
  };

  return {
    sheetRef,
    handleRef,
    translateY,
    isDragging,
    measured,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  } as BottomSheetInteraction;
} 