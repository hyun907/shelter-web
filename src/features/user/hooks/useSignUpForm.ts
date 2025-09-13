import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignUp } from "@/shared/services/mutations/useSignUp";

const schema = z.object({
  id: z.string().min(8, "사용할 수 없는 아이디입니다.").max(16, "사용할 수 없는 아이디입니다."),
  password: z
    .string()
    .min(8, "8자 이상, 특수문자를 포함해주세요.")
    .max(16, "16자 이내의 비밀번호를 입력해주세요."),
  passwordConfirm: z.string().min(1, "비밀번호를 입력해주세요."),
  nickname: z.string().min(2, "사용 불가한 닉네임입니다.").max(10, "사용 불가한 닉네임입니다."),
  birth: z
    .string()
    .min(1, "생년월일을 선택해주세요.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD 형식으로 입력해주세요."),
  gender: z.enum(["male", "female"], { message: "성별을 선택해주세요." })
});

export function useSignUpForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      id: "",
      password: "",
      passwordConfirm: "",
      nickname: "",
      birth: "",
      gender: undefined
    }
  });

  const mutation = useSignUp((data: unknown) => {
    console.log("폼 훅 내부에서 회원가입 성공 처리", data);
  });

  const birthValue = watch("birth");
  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    mutation,
    birthValue,
    password,
    passwordConfirm
  };
}
