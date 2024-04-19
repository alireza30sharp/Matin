import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, interval, of, Subject } from 'rxjs';

import { remainingTime } from '@persian-tools/persian-tools';
import {
  AuthenticationBase,
  AuthenticationLogin,
  IExistenceUser,
  JwtToken,
  UserCreate,
  UserCreateAuth,
} from '@models';
import { ApiUrlService, UserAuthService } from '@services';

export type FormState = 'username' | 'password' | 'Otp' | 'signup' | 'recovery';

@Injectable()
export class AuthVMService {
  formState: FormState = 'username';

  signingForm = this.fb.group({
    companyName: [
      null,
      [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
    ],
    companyPassword: [
      null,
      [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    ],
    Otp: [
      null,
      [Validators.required, Validators.min(10000), Validators.max(99999)],
    ],
  });
  checkPasswords: ValidatorFn = (
    formCtrl: AbstractControl
  ): ValidationErrors | null => {
    const errors: any = {};
    const group: AbstractControl = formCtrl.parent!;
    if (group == null) {
      return null;
    }
    const passCtrl = group.get('companyPassword');
    let pass = passCtrl?.value;

    const cfgPassCtrl = group.get('confirmPassword');
    const confirmPass = cfgPassCtrl?.value;

    if (pass == null && confirmPass == null) {
      return errors;
    }

    // check password is match
    if ((pass || confirmPass) && pass !== confirmPass) {
      errors.notSame = true;
    }

    // check password has two number
    if (!/[0-9]{2}/.test(pass)) {
      errors.notNumber = true;
    }

    // check password is at least 8 characters
    if (pass == null || pass.length < 8) {
      errors.notLong = true;
    }

    if (!/\D{2}/.test(pass)) {
      errors.notLetter = true;
    }

    // if (!/[!@#$%^&*()_+\-={};':"\\|,.<>/?[\]]+/.test(pass)) {
    //   errors.notSpecial = true;
    // }
    if (passCtrl && passCtrl !== formCtrl) {
      passCtrl.updateValueAndValidity({ onlySelf: true });
    }
    // if (passCtrl?.dirty && passCtrl?.valid) {
    // }

    if (Object.keys(errors).length) {
      errors.hasErrors = true;
    } else if (cfgPassCtrl && cfgPassCtrl.invalid && cfgPassCtrl !== formCtrl) {
      cfgPassCtrl.updateValueAndValidity({ onlySelf: true });
    }

    return errors.hasErrors ? errors : null;
  };
  passwordValidations = [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/[0-9]{2}/),
    Validators.pattern(/\D{2}/),
    // Validators.pattern(/[!@#$%^&*()_+\-={};':"\\|,.<>/?[\]]+/)
    this.checkPasswords,
  ];
  signupForm = this.fb.group({
    companyMobile: [null, []],
    companyName: [
      null,
      [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
    ],
    email: [
      null,
      [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
    ],
    mobile_number: [
      null,
      [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
    ],
    companyPassword: [null, this.passwordValidations],
    confirmPassword: [null, this.passwordValidations],
  });

  otpData?: AuthenticationLogin;

  get userNameControl() {
    return this.signingForm.get('companyName')!;
  }

  get passwordControl() {
    return this.signingForm.get('companyPassword')!;
  }

  get otpControl() {
    return this.signingForm.get('Otp')!;
  }
  get signupForm_mobileControl() {
    return this.signupForm.get('mobile_number')!;
  }

  errorText = '';

  constructor(
    private readonly $http: HttpClient,
    public readonly fb: FormBuilder,
    private readonly urlSvc: ApiUrlService,
    private readonly authSvc: UserAuthService
  ) {}

  signup(model: UserCreateAuth) {
    return this.$http.post(this.urlSvc.auth.signup, model);
  }

  singing(model: AuthenticationBase) {
    return this.$http
      .post<JwtToken>(this.urlSvc.auth.signing, model)
      .pipe
      // map(res => {
      //   this.authSvc.user = {} as any;
      //   if (res) {
      //     this.authSvc.user = {} as any;
      //   } else {
      //   }
      //   return res;
      // })
      ();
  }

  sendOtp(mobile: string) {
    return this.$http.post<any>(
      this.urlSvc.auth.otp,
      { companyMobile: mobile }
      // {
      //   params: {
      //     mobile_number: mobile,
      //   },
      // }
    );
  }
  emailAuth(email: string) {
    return this.$http.post<any>(this.urlSvc.auth.emailAuth, { email: email });
  }
  emailSignIn(email: string, password: string) {
    return this.$http.post<any>(this.urlSvc.auth.emailSignIn, {
      email: email,
      password: password,
    });
  }
  verifyOtp(code: number) {
    return this.$http.post<AuthenticationLogin>(
      this.urlSvc.auth.verifyOtp,
      {},
      {
        params: {
          code: code.toString(),
        },
      }
    );
  }

  verifyAccount(text: string) {
    return this.$http.post(`${this.urlSvc.auth.verifyAccount}/${text}`, {});
  }
  existenceUser(phonenumber, val) {
    return this.$http.get<IExistenceUser>(
      `${this.urlSvc.user.check}/${phonenumber}`,
      {
        params: {
          val: val,
        },
      }
    );
  }

  changeFormState(state: FormState) {
    this.formState = state;

    const m = 'runForm_' + state;
    const _that: any = this;
    _that[m] && _that[m]();
  }

  otpTimer = 0;
  otpTimerTextAction$ = new BehaviorSubject('00:00');
  otpIntervalId: any;

  runForm_username() {
    this.clearSigningForm();
  }

  runForm_otp() {
    this.otpTimer = Date.now() + 3 * 60 * 1000;
    this.otpTimerTextAction$.next('03:00');
    const numFormat = new Intl.NumberFormat('en', {
      minimumIntegerDigits: 2,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    clearInterval(this.otpIntervalId);
    this.otpIntervalId = setInterval(() => {
      const { years, months, days, hours, minutes, seconds, isFinished } =
        remainingTime(this.otpTimer);
      if (isFinished) {
        this.otpTimer = 0;
        clearInterval(this.otpIntervalId);
      }
      this.otpTimerTextAction$.next(
        `${numFormat.format(minutes)}:${numFormat.format(seconds)}`
      );
    }, 1000);
  }

  _errorTimeoutId: any;
  showErrorMessage(err: string) {
    clearTimeout(this._errorTimeoutId);
    this.errorText = err;
    this._errorTimeoutId = setTimeout(() => {
      this.clearError();
    }, 10000);
  }

  clearError() {
    this.errorText = '';
  }

  clearAllSingingForm() {
    this.signingForm.clearValidators();
    this.signingForm.reset();
  }

  clearSigningForm() {
    this.otpControl.reset();
    this.passwordControl.reset();
  }

  createUserModel(user: Partial<UserCreate>) {
    delete user.confirmPassword;
    return this.$http.put<JwtToken>(this.urlSvc.auth.signup, user);
  }
}
