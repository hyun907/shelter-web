import { z } from "zod";

export const signUpSchema = z.object({
  memberId: z
    .string()
    .min(8, "8자 이상, 16자 이내의 아이디를 입력해주세요.")
    .max(16, "8자 이상, 16자 이내의 아이디를 입력해주세요."),
  memberPassword: z
    .string()
    .min(8, "8자 이상, 특수문자를 포함해주세요.")
    .max(16, "16자 이내, 특수문자를 포함해주세요."),
  memberName: z.string().min(2, "닉네임은 2글자 이상 입력해주세요."),
  birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD 형식으로 입력해주세요."),
  gender: z.enum(["male", "female"], { message: "성별을 선택해주세요." })
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
