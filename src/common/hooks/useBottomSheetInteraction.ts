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

  // 초기값을 큰 값으로 설정하여 처음부터 화면 밖에 위치
  const [translateY, setTranslateY] = useState(1000);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [measured, setMeasured] = useState(false);

  const recalc = useCallback(() => {
    const el = sheetRef.current;
    if (!el) return;

    // ResizeObserver나 getBoundingClientRect를 사용하여 정확한 높이 측정
    const rect = el.getBoundingClientRect();
    const h = rect.height;

    if (h === 0) {
      // 아직 높이가 측정되지 않았다면 다음 프레임에서 재시도
      requestAnimationFrame(() => recalc());
      return;
    }

    const maxTranslate = Math.max(h - peekHeight, 0);
    maxTranslateRef.current = maxTranslate;

    // 항상 바텀 위치로 설정 (measured 상태와 관계없이)
    setTranslateY(maxTranslate);

    if (!measured) {
      setMeasured(true);
    }
  }, [peekHeight, measured]);

  useEffect(() => {
    // 초기 측정은 DOM이 완전히 렌더링된 후 실행
    const measureInitial = () => {
      // 여러 프레임에 걸쳐 측정 시도
      let attempts = 0;
      const maxAttempts = 10;

      const tryMeasure = () => {
        const el = sheetRef.current;
        if (!el) {
          if (attempts < maxAttempts) {
            attempts++;
            requestAnimationFrame(tryMeasure);
          }
          return;
        }

        const rect = el.getBoundingClientRect();
        if (rect.height === 0 && attempts < maxAttempts) {
          attempts++;
          requestAnimationFrame(tryMeasure);
          return;
        }

        recalc();
      };

      requestAnimationFrame(tryMeasure);
    };

    measureInitial();

    // ResizeObserver를 사용하여 더 정확한 크기 변경 감지
    const resizeObserver = new ResizeObserver(() => {
      // measured가 true일 때만 recalc 호출하여 불필요한 재계산 방지
      if (measured) {
        const el = sheetRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const h = rect.height;

        if (h > 0) {
          const maxTranslate = Math.max(h - peekHeight, 0);
          maxTranslateRef.current = maxTranslate;

          // 현재 위치가 collapsed 상태라면 새로운 바텀 위치로 업데이트
          if (translateY >= maxTranslateRef.current * 0.8) {
            setTranslateY(maxTranslate);
          }
        }
      }
    });

    if (sheetRef.current) {
      resizeObserver.observe(sheetRef.current);
    }

    // 윈도우 리사이즈 이벤트도 유지
    const onResize = () => {
      if (measured) {
        const el = sheetRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const h = rect.height;

        if (h > 0) {
          const maxTranslate = Math.max(h - peekHeight, 0);
          maxTranslateRef.current = maxTranslate;

          // 현재 위치가 collapsed 상태라면 새로운 바텀 위치로 업데이트
          if (translateY >= maxTranslateRef.current * 0.8) {
            setTranslateY(maxTranslate);
          }
        }
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [recalc, measured]);

  const onPointerDown = (e: React.PointerEvent) => {
    // 측정이 완료되지 않았으면 동작하지 않음
    if (!measured || e.button !== 0) return;
    e.preventDefault();

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      setIsAnimating(false);
    }

    setIsDragging(true);
    startYRef.current = e.clientY;
    startTranslateRef.current = translateY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !measured) return;
    const dy = e.clientY - startYRef.current;
    const next = Math.min(Math.max(startTranslateRef.current + dy, 0), maxTranslateRef.current);
    setTranslateY(next);
  };

  const onPointerUp = () => {
    if (!isDragging || !measured) return;
    setIsDragging(false);
    const over = maxTranslateRef.current;
    const snapTo = translateY < over / 2 ? 0 : over;

    // 애니메이션으로 스냅
    animateToPosition(snapTo);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (!measured || e.touches.length === 0) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      setIsAnimating(false);
    }

    setIsDragging(true);
    const touch = e.touches[0];
    startYRef.current = touch.clientY;
    startTranslateRef.current = translateY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !measured || e.touches.length === 0) return;
    const touch = e.touches[0];
    const dy = touch.clientY - startYRef.current;
    const next = Math.min(Math.max(startTranslateRef.current + dy, 0), maxTranslateRef.current);
    setTranslateY(next);
  };

  const onTouchEnd = () => {
    if (!isDragging || !measured) return;
    setIsDragging(false);
    const over = maxTranslateRef.current;
    const snapTo = translateY < over / 2 ? 0 : over;

    // 애니메이션으로 스냅
    animateToPosition(snapTo);
  };

  // 공통 애니메이션 함수
  const animateToPosition = useCallback(
    (targetY: number) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      setIsAnimating(true);

      const startY = translateY;
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
    },
    [translateY]
  );

  const expandToTop = useCallback(() => {
    if (isDragging || !measured) return;
    animateToPosition(0);
  }, [isDragging, measured, animateToPosition]);

  const collapseToBottom = useCallback(() => {
    if (isDragging || !measured) return;
    animateToPosition(maxTranslateRef.current);
  }, [isDragging, measured, animateToPosition]);

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
