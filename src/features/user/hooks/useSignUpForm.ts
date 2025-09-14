import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "../services/mutations/useSignUp";
import { signUpSchema, type SignUpFormData } from "../schemas/signup.schema";

export type SignUpFormMethods = UseFormReturn<SignUpFormData>;

export function useSignUpForm() {
  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      memberId: "",
      memberPassword: "",
      memberName: "",
      birthday: "",
      gender: undefined
    }
  });

  const mutation = useSignUp(data => {
    console.log(data.message);
  });

  return { methods, mutation, onSubmit: methods.handleSubmit(data => mutation.mutate(data)) };
}
