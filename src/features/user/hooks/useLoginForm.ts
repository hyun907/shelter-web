import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const schema = z.object({
  id: z.string().min(8, "아이디를 입력해주세요.").max(16, "아이디를 입력해주세요."),
  password: z.string().min(8, "비밀번호를 입력해주세요.").max(16, "비밀번호를 입력해주세요.")
});

const loginApi = async (data: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.id === "testuser" && data.password === "testpass123") {
        resolve(data);
      } else {
        reject(new Error("아이디 또는 비밀번호가 올바르지 않습니다."));
      }
    }, 1000);
  });
};

export function useLoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      id: "",
      password: ""
    }
  });

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      form.reset();
    }
  });

  return { ...form, mutation };
}
