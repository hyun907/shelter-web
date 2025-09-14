import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../services/mutations/useLogin";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";

export type LoginFormMethods = UseFormReturn<LoginFormData>;

export function useLoginForm() {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      memberId: "",
      memberPassword: ""
    }
  });

  const mutation = useLogin();

  const onSubmit = methods.handleSubmit(data => {
    mutation.mutate({
      memberId: data.memberId,
      memberPassword: data.memberPassword
    });
  });

  return {
    ...methods,
    mutation,
    onSubmit
  };
}
