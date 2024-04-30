export interface AuthenticationBase {
  username: string;
  password: string;
}
export interface User {
  fname: string;
  lname: string;
  mobile_number: string;
  email: string;
}
export interface UserCreateAuth {
  user_auth: AuthenticationBase;
  user_info: User;
}

export interface AuthenticationLogin {
  user_pk_id: number;
  username: string;
  mobile_number: string;
  has_account: boolean;
  has_password: boolean;
  login_method: 'otp' | 'Register';
  otp_send_successful: boolean;
  email_send_successful: boolean;
}


export interface JwtToken {
  companyName: string;
  companyId:any,
  uniqCode: string;
  companyTypeId: number;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

export interface IExistenceUser {
  action: string;
  exsisted: boolean;
  auth_type: any;
}
export enum ActionLogin {
  MobileNumber = 'mobile_number',
  Email = 'email',
}
export enum ActionMethod {
  Login = 'Login',
  Register = 'Register',
  Otp = 'Otp',
}
export interface UserCreate extends User, AuthenticationBase {
  confirmPassword: string;
}
