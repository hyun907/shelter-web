import Button from "@/common/components/button/Button";
import Input from "@/common/components/input/Input";
import Header from "@/common/components/header/Header";
import { FaUser, FaLock, FaCalendarAlt } from "react-icons/fa";
import styles from "./SignUp.module.css";
import { useSignUpForm } from "../../hooks/useSignUpForm";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    mutation,
    password,
    passwordConfirm
  } = useSignUpForm();

  return (
    <div className={styles.signupContainer}>
      <Header title="회원가입" />
      <p className={styles.text}>
        내 주변{" "}
        <span className={styles.bold}>
          안전한 대피소,
          <br />
        </span>
        빠르고 정확하게 안내해드릴게요.
      </p>
      <form className={styles.inputArea} onSubmit={handleSubmit(data => mutation.mutate(data))}>
        <Input Icon={FaUser} placeholder="아이디 입력 (8-16자)" {...register("id")} />
        {errors.id && <div className={styles.error}>{errors.id.message}</div>}

        <Input
          Icon={FaLock}
          placeholder="비밀번호 입력 (8-16자, 특수문자 포함)"
          secureTextEntry
          {...register("password")}
        />
        {errors.password && <div className={styles.error}>{errors.password.message}</div>}

        <Input
          Icon={FaLock}
          placeholder="비밀번호 확인"
          secureTextEntry
          {...register("passwordConfirm")}
        />
        {errors.passwordConfirm ? (
          <div className={styles.error}>{errors.passwordConfirm.message}</div>
        ) : passwordConfirm && password !== passwordConfirm ? (
          <div className={styles.error}>비밀번호가 일치하지 않습니다.</div>
        ) : null}

        <Input Icon={FaUser} placeholder="닉네임 입력" {...register("nickname")} />
        {errors.nickname && <div className={styles.error}>{errors.nickname.message}</div>}

        <Input
          Icon={FaCalendarAlt}
          placeholder="생년월일 입력 (YYYY-MM-DD)"
          {...register("birth", { pattern: /^\d{4}-\d{2}-\d{2}$/ })}
        />

        {errors.birth && <div className={styles.error}>{errors.birth.message}</div>}

        <div className={styles.genderArea}>
          <button
            type="button"
            className={watch("gender") === "male" ? styles.genderSelected : styles.genderButton}
            onClick={() => setValue("gender", "male", { shouldValidate: true })}
          >
            남성
          </button>
          <button
            type="button"
            className={watch("gender") === "female" ? styles.genderSelected : styles.genderButton}
            onClick={() => setValue("gender", "female", { shouldValidate: true })}
          >
            여성
          </button>
        </div>
        {errors.gender && <div className={styles.error}>{errors.gender.message}</div>}

        <Button
          title={mutation.isPending ? "가입 중..." : "가입하기"}
          className={styles.signupButton}
          onClick={handleSubmit(data => mutation.mutate(data))}
        />
      </form>
    </div>
  );
}
