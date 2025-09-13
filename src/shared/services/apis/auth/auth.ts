import api from "../baseApi";
import type { LoginRequest, SignUpRequest } from "../../types/auth";

export const postSignUp = (payload: SignUpRequest) => {
  return api.post("/save", payload);
};

export const postLogin = (payload: LoginRequest) => {
  return api.post("/login", payload);
};
