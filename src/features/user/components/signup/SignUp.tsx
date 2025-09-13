import { useState } from "react";
import Button from "@/common/components/button/Button";
import Input from "@/common/components/input/Input";
import Header from "@/common/components/header/Header";
import { FaUser, FaLock, FaCalendarAlt } from "react-icons/fa";
import styles from "./SignUp.module.css";
import { useSignUpForm } from "../../hooks/useSignUpForm";
import { FormProvider, useFormContext, type FieldError } from "react-hook-form";

export default function SignUp() {
  const { methods, onSubmit } = useSignUpForm();
  const [memberPasswordConfirm, setMemberPasswordConfirm] = useState("");

  const memberPassword = methods.watch("memberPassword");

  return (
    <FormProvider {...methods}>
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

        <form className={styles.inputArea} onSubmit={onSubmit}>
          <InputIcon name="memberId" Icon={FaUser} placeholder="아이디 입력 (8-16자)" />
          <InputIcon
            name="memberPassword"
            Icon={FaLock}
            placeholder="비밀번호 입력 (8-16자, 특수문자 포함)"
            secureTextEntry
          />
          <Input
            Icon={FaLock}
            placeholder="비밀번호 확인"
            secureTextEntry
            value={memberPasswordConfirm}
            onChange={e => setMemberPasswordConfirm(e.target.value)}
          />
          {memberPasswordConfirm && memberPassword !== memberPasswordConfirm && (
            <div className={styles.error}>비밀번호가 일치하지 않습니다.</div>
          )}
          <InputIcon name="memberName" Icon={FaUser} placeholder="닉네임 입력" />
          <InputIcon
            name="birthday"
            Icon={FaCalendarAlt}
            placeholder="생년월일 입력 (YYYY-MM-DD)"
          />

          <div className={styles.genderArea}>
            {["male", "female"].map(g => (
              <button
                key={g}
                type="button"
                className={
                  methods.watch("gender") === g ? styles.genderSelected : styles.genderButton
                }
                onClick={() =>
                  methods.setValue("gender", g as "male" | "female", { shouldValidate: true })
                }
              >
                {g === "male" ? "남성" : "여성"}
              </button>
            ))}
          </div>
          {methods.formState.errors.gender && (
            <div className={styles.error}>{methods.formState.errors.gender.message}</div>
          )}

          <Button title={"가입하기"} className={styles.signupButton} onClick={onSubmit} />
        </form>
      </div>
    </FormProvider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InputIcon({ name, Icon, placeholder, secureTextEntry }: any) {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  return (
    <>
      <Input
        Icon={Icon}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        {...register(name)}
      />
      {errors[name] && <div className={styles.error}>{(errors[name] as FieldError).message}</div>}
    </>
  );
}
