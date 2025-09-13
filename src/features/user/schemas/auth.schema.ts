//회원가입
export type SignUpRequest = {
  memberId: string;
  memberPassword: string;
  memberName: string;
  gender: string;
  birthday: string;
};

//로그인
export type LoginRequest = {
  memberId: string;
  memberPassword: string;
};
