export interface UserInfoType {
  id: number;
  userName: string;
  mobile: string;
  avatar: string;
  password: string;
}

export interface LoginInfoType {
  userNo: string;
  password: string;
  remember: boolean;
}
