import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../auth";
import type { LoginRequest } from "../../schemas/auth.schema";

export function useLogin(onSuccess?: (data: unknown) => void) {
  return useMutation<unknown, unknown, LoginRequest>({
    mutationFn: (payload: LoginRequest) => postLogin(payload),
    onSuccess: (data: unknown) => {
      console.log("로그인 성공");
      onSuccess?.(data);
    },
    onError: (error: unknown) => {
      console.error("로그인 실패:", error);
    }
  });
}
