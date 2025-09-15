import Button from "@/common/components/button/Button";
import { getErrorIcon, getActionText } from "../utils/positionErrorUtils";
import { usePositionErrorActions } from "../hooks/usePositionErrorActions";
import styles from "./PositionErrorModal.module.css";

type PositionError = {
  type: "permission_denied" | "position_unavailable" | "timeout" | "not_supported" | "unknown";
  message: string;
};

interface PositionErrorModalProps {
  error: PositionError;
  onRetry: () => void;
  onClose: () => void;
}

export function PositionErrorModal({ error, onRetry, onClose }: PositionErrorModalProps) {
  const { handleErrorAction } = usePositionErrorActions();

  const handleAction = () => {
    handleErrorAction(error, onRetry);
    // 권한 거부가 아닌 경우에만 모달 닫기
    if (error.type !== "permission_denied") {
      onClose();
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.icon}>{getErrorIcon(error.type)}</div>
      <h3 className={styles.title}>위치 정보를 가져올 수 없습니다</h3>
      <p className={styles.message}>{error.message}</p>
      <div className={styles.buttonGroup}>
        <Button title="닫기" onClick={onClose} className={styles.closeButton} />
        <Button
          title={getActionText(error.type)}
          onClick={handleAction}
          className={styles.actionButton}
        />
      </div>
    </div>
  );
}
