import styles from "./Button.module.css";

interface ButtonProps {
  title: string;
  onClick: () => void;
  className?: string;
  textClassName?: string;
}

export default function Button({ title, onClick, className, textClassName }: ButtonProps) {
  return (
    <button className={`${styles.button} ${className ?? ""}`} onClick={onClick}>
      <span className={`${styles.buttonText} ${textClassName ?? ""}`}>{title}</span>
    </button>
  );
}
