export enum OtpTypes {
  SignIn = 1,
  SignUp = 1,
  ResetPassword = 3,
  ChangePhoneNumber = 4,
  Payment = 5,
  Discharging = 8
};

export interface OtpSignIn {
  otpSession: {
    otpSessionType: OtpTypes;
    guid: string;
  },
  phoneNumber: string;
  password: string;
}

export interface OtpResponse {
  statusCode: number;
  message: string;
  data: any;
}

/** مدل داده های ارسالی به ای پی آی ثبت نام */
export interface ISignUp {
  otpSession: {
    otpSessionType: number;
    guid: string;
  },
  phoneNumber: string;
  password: string;
  checkPassword: string;
  securityPhrase: string;
  checkSecurityPhrase: string;
  displayName: string;
  avatar: string;
  introducerId: number;
  fingerPrint: string,
  answer: [
    {
      questionsId: number,
      answerText: string
    }
  ]
}

/** Reset password model */
export interface ResetPassword {
  otpSession: {
    otpSessionType: OtpTypes;
    guid: string;
  },
  phoneNumber: string;
  newPassword: string;
  checkPassword: string;
  securityPhrase: string;
  checkSecurityPhrase: string;
}

/** Change phone_number model */
export interface ChangePhoneNumber {
  requester: string;
  code: number;
  otpType: OtpTypes,
  payload:
  {
    oldNumber: string;
    password: string;
  },
  guid: string;
}

export interface OtpDefault {
  requester?: string;
  code?: number;
  otpType?: OtpTypes;
  payload?: any;
}
