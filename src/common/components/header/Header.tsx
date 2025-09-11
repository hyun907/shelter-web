import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import styles from "./Header.module.css";

interface HeaderProps {
  title: string;
  canGoBack?: boolean;
  onBackPress?: () => void;
}

export default function Header({ title, canGoBack = true, onBackPress }: HeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={styles.container}>
      {canGoBack ? (
        <button className={styles.backButton} onClick={handleBack}>
          <IoChevronBack size={28} color="#1C2024" />
        </button>
      ) : (
        <div className={styles.backButton} />
      )}
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.backButton} />
    </div>
  );
}
