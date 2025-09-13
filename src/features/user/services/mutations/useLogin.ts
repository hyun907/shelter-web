import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../auth";
import type { LoginRequest, LoginResponse } from "../../schemas/auth.schema";
import { useNavigate } from "react-router-dom";

export function useLogin(onSuccess?: (data: LoginResponse) => void) {
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (payload: LoginRequest) => postLogin(payload),
    onSuccess: data => {
      navigate("/map");
      onSuccess?.(data);
    },
    onError: error => {
      console.error("로그인 실패:", error.message);
    }
  });
}
