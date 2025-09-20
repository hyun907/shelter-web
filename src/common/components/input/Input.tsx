import React, { useState } from "react";
import styles from "./Input.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: React.ComponentType<{ size?: number; color?: string }>;
  secureTextEntry?: boolean;
}

export default function Input({ Icon, secureTextEntry: secureEntryProp, ...props }: InputProps) {
  const [secureTextEntry, setSecureTextEntry] = useState(secureEntryProp ?? false);

  return (
    <div className={styles.inputWrapper}>
      {Icon && (
        <div className={styles.leftIcon}>
          <Icon size={20} color="#bec1d1" />
        </div>
      )}
      <input
        className={`${styles.input} ${Icon ? styles.hasIcon : ""}`}
        {...props}
        type={secureEntryProp ? (secureTextEntry ? "password" : "text") : props.type || "text"}
      />

      {secureEntryProp && (
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setSecureTextEntry(!secureTextEntry)}
        >
          {secureTextEntry ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
        </button>
      )}
    </div>
  );
}
