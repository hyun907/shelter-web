import api from "../../../shared/services/apis/api";
import type {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse
} from "../schemas/auth.schema";

export const postSignUp = (payload: SignUpRequest): Promise<SignUpResponse> => {
  return api.post("/save", payload);
};

export const postLogin = (payload: LoginRequest): Promise<LoginResponse> => {
  console.log("payload 임시테스트 콘솔: ", payload);
  return api.post("/login", payload);
};
