//회원가입
export interface SignUpRequest {
  memberId: string;
  memberPassword: string;
  memberName: string;
  gender: string;
  birthday: string;
}

//로그인
export interface LoginRequest {
  memberId: string;
  memberPassword: string;
}
