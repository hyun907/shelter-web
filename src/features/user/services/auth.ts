import api from "../../../shared/services/apis/api";
import type { LoginRequest, SignUpRequest } from "../schemas/auth.schema";

export const postSignUp = (payload: SignUpRequest) => {
  return api.post("/save", payload).then(res => res.data);
};

export const postLogin = (payload: LoginRequest) => {
  return api.post("/login", payload).then(res => res.data);
};
