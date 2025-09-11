import { useNavigate } from "react-router-dom";
import Button from "@/common/components/button/Button";
import Input from "@/common/components/input/Input";
import styles from "./Login.module.css";
import LogoIcon from "@/assets/icon/cb_point.svg";
import { FaUser, FaLock } from "react-icons/fa";
import { useLoginForm } from "../../hooks/useLoginForm";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, mutation } = useLoginForm();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleGuest = () => {
    // 로그인 없이 둘러보기 처리
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.logoArea}>
        <img src={LogoIcon} alt="Logo" className={styles.logoImg} />
        <span className={styles.logoText}>LOGO</span>
      </div>

      <div className={styles.inputArea}>
        <Input Icon={FaUser} placeholder="아이디" {...register("id")} />
        <Input
          Icon={FaLock}
          placeholder="비밀번호"
          type="password"
          {...register("password")}
          secureTextEntry
        />
        {mutation.isError && (
          <div className={styles.error}>아이디 또는 비밀번호가 올바르지 않습니다.</div>
        )}
      </div>

      <div className={styles.buttonArea}>
        <Button
          title={mutation.isPending ? "로그인 중..." : "로그인"}
          onClick={handleSubmit(data => mutation.mutate(data))}
        />
        <Button title="회원가입" onClick={handleSignup} className={styles.grayButton} />
      </div>

      <button className={styles.guestButton} onClick={handleGuest}>
        로그인 없이 둘러보기
      </button>
    </div>
  );
}
