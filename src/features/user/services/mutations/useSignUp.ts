import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSignUp } from "../auth";
import type { SignUpRequest } from "../../schemas/auth.schema";

export function useSignUp(onSuccess?: (data: { message: string }) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SignUpRequest) => postSignUp(payload),
    onSuccess: data => {
      onSuccess?.(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: error => {
      console.error("회원가입 실패:", error);
    }
  });
}
