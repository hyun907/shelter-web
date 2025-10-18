import React, { useCallback } from "react";
import type { NearbyShelterApiItem } from "../schemas/shelter.schema";
import styles from "./shelter-bottom-sheet-content.module.css";

interface ShelterListItemProps {
  item: NearbyShelterApiItem;
  onPress: (shelter: NearbyShelterApiItem) => void;
}

export const ShelterListItem = React.memo(
  ({ item, onPress }: ShelterListItemProps) => {
    const handleClick = useCallback(() => {
      onPress(item);
    }, [item, onPress]);

    return (
      <button
        key={`${item.RSTR_NM}-${item.RN_DTL_ADRES || item.DTL_ADRES}`}
        className={styles.card}
        onClick={handleClick}
      >
        <div className={styles.title}>{item.RSTR_NM || "이름 없음"}</div>
        <div className={styles.address}>{item.RN_DTL_ADRES || item.DTL_ADRES || "주소 없음"}</div>
        <div className={styles.meta}>
          <span className={styles.distance}>{item.distance}km</span>
        </div>
      </button>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.item.RSTR_NM === nextProps.item.RSTR_NM &&
      prevProps.item.RN_DTL_ADRES === nextProps.item.RN_DTL_ADRES
    );
  }
);

ShelterListItem.displayName = "ShelterListItem";
