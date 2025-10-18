import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { NearbyShelterApiItem } from "../schemas/shelter.schema";
import { useBottomSheetStore } from "@/common/hooks/useBottomSheetStore";

const INITIAL_RENDER_COUNT = 10;
const LOAD_MORE_COUNT = 20;

export function useShelterList(items?: NearbyShelterApiItem[]) {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(INITIAL_RENDER_COUNT);

  const visibleItems = useMemo(() => items?.slice(0, visibleCount) || [], [items, visibleCount]);

  useEffect(() => {
    if (visibleItems.length === 0) return;

    const lastItem = document.querySelector(`[data-shelter-index="${visibleItems.length - 1}"]`);
    if (!lastItem) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleCount((prev: number) => {
            const newCount = Math.min(prev + LOAD_MORE_COUNT, items?.length || 0);
            return newCount;
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(lastItem);
    return () => observer.disconnect();
  }, [visibleItems.length, items?.length]);

  const handlePress = useCallback(
    (shelter: NearbyShelterApiItem) => {
      useBottomSheetStore.setState({
        content: null,
        ariaLabel: null,
        expandToTop: null,
        collapseToBottom: null
      });
      const query = encodeURIComponent(JSON.stringify(shelter));
      navigate(`/detail?shelter=${query}`);
    },
    [navigate]
  );

  return {
    visibleItems,
    handlePress
  };
}
