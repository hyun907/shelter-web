import { useCallback, useEffect, useRef, useState } from "react";

export type BottomSheetInteraction = {
  sheetRef: React.RefObject<HTMLDivElement>;
  handleRef: React.RefObject<HTMLDivElement>;
  translateY: number;
  isDragging: boolean;
  isAnimating: boolean;
  measured: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  expandToTop: () => void;
  collapseToBottom: () => void;
};

export function useBottomSheetInteraction(peekHeight: number) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const startTranslateRef = useRef(0);
  const maxTranslateRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const initialTranslate = Math.max(Math.round(window.innerHeight * 0.7) - peekHeight, 0);
  const [translateY, setTranslateY] = useState(initialTranslate);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
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
    return () => {
      window.removeEventListener("resize", onResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [recalc]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

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

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

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

  const expandToTop = useCallback(() => {
    if (isDragging) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsAnimating(true);

    const startY = translateY;
    const targetY = 0;
    const duration = 300;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentY = startY + (targetY - startY) * easeOutCubic;

      setTranslateY(currentY);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
        setIsAnimating(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [translateY, isDragging]);

  const collapseToBottom = useCallback(() => {
    if (isDragging) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsAnimating(true);

    const startY = translateY;
    const targetY = maxTranslateRef.current;
    const duration = 300;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentY = startY + (targetY - startY) * easeOutCubic;

      setTranslateY(currentY);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
        setIsAnimating(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [translateY, isDragging]);

  return {
    sheetRef,
    handleRef,
    translateY,
    isDragging,
    isAnimating,
    measured,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    expandToTop,
    collapseToBottom
  } as BottomSheetInteraction;
}
