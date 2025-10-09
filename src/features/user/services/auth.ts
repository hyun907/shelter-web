import api from "../../../shared/services/apis/api";
import type { LoginRequest, SignUpRequest } from "../schemas/auth.schema";

export const postSignUp = (payload: SignUpRequest) => {
  return api.post("/save", payload);
};

export const postLogin = (payload: LoginRequest) => {
  console.log("payload 임시테스트 콘솔: ", payload);
  return api.post("/login", payload);
};
