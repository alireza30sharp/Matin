import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { UserAuthService } from '~/services';
import {
  phoneNumberValidator,
  phoneNumberNormalizer,
} from '@persian-tools/persian-tools';
import { AuthVMService } from '~/share/services/auth-vm.service';
import { ActionLogin, ActionMethod } from '~/models';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss'],
})
export class SigningComponent implements OnInit {
  showPassword = false;

  userNameLoading = false;
  passwordLoading = false;
  otpVerifyLoading = false;
  exsistedUser: boolean = true;
  constructor(public authSvc: UserAuthService, public authVM: AuthVMService) {}

  ngOnInit(): void {}

  signupUserName(allow = false) {
    if (!allow && this.authVM.formState !== 'username') {
      return;
    }
    if (this.userNameLoading) {
      return;
    }
    const username = this.authVM.userNameControl.value;

    this.authVM.clearError();

    if (phoneNumberValidator(username)) {
      this.userNameLoading = true;
      this.authVM
        .existenceUser(ActionLogin.MobileNumber, username)
        .subscribe((res) => {
          if (res.exsisted) {
            this.exsistedUser = false;
            this.authVM
              .sendOtp(phoneNumberNormalizer(username, '0'))
              .subscribe({
                next: (res) => {
                  this.userNameLoading = false;
                  this.authVM.clearError();
                  this.authVM.otpData = res;
                  if (res.login_method === ActionMethod.Otp) {
                    this.authVM.changeFormState(ActionMethod.Otp);
                  }
                },
                error: (err) => {
                  this.userNameLoading = false;
                  this.authVM.showErrorMessage(
                    'کد تایید با موفقیت ارسال نشد، لطفا مجدد سعی نمایید.'
                  );
                },
              });
          } else {
            if (res.action === ActionMethod.Register) {
              this.authVM.changeFormState('signup');
              this.authVM.signupForm_mobileControl.setValue(
                this.authVM.userNameControl.value
              );
            }
          }
        });
    }
    // Email regex matches
    else if (
      true ||
      new RegExp(
        /^[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)*@[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)+$/i
      ).test(username)
    ) {
      this.userNameLoading = true;
      this.authVM
        .existenceUser(ActionLogin.Email, username)
        .subscribe((res) => {
          if (res.exsisted) {
            this.authVM.changeFormState('password');
          } else {
            if (res.action === ActionMethod.Register) {
              this.authVM.changeFormState('signup');
              this.authVM.signupForm_mobileControl.setValue(
                this.authVM.userNameControl.value
              );
            }
          }
        });
    } else {
      this.authVM.showErrorMessage(
        'لطفا شماره همراه یا آدرس ایمیل صحیح وارد نمایید.'
      );
    }
  }

  updateFormStateToUserName() {
    this.authVM.changeFormState('username');
  }

  signingWithPassword() {
    if (this.authVM.formState !== 'password') {
      return;
    }
    if (this.passwordLoading) {
      return;
    }
    const username = this.authVM.userNameControl.value;
    const password = this.authVM.passwordControl.value;

    if (username && password) {
      this.passwordLoading = true;
      this.authVM
        .existenceUser(ActionLogin.Email, username)
        .subscribe((res) => {
          if (res.exsisted && res.action == ActionMethod.Login) {
            this.authVM
              .singing({
                username,
                password,
              })
              .subscribe({
                next: (res) => {
                  this.passwordLoading = false;
                  this.authSvc.prepareSigning(res);
                },
                error: (err: HttpErrorResponse) => {
                  this.passwordLoading = false;
                  this.authVM.showErrorMessage(err.error.detail);
                },
              });
          } else {
            if (res.action === ActionMethod.Register) {
              this.authVM.changeFormState('signup');
              this.authVM.signupForm_mobileControl.setValue(
                this.authVM.userNameControl.value
              );
            }
          }
        });
    } else {
      this.authVM.passwordControl.markAsDirty();
    }
  }

  verifyOtp(otp: string) {
    if (this.authVM.formState !== ActionMethod.Otp) {
      return;
    }
    if (this.otpVerifyLoading) {
      return;
    }
    const username = this.authVM.userNameControl.value;
    // const otp = this.authVM.otpControl.value;

    this.otpVerifyLoading = true;
    this.authVM.clearError();
    this.authVM.verifyOtp(+otp).subscribe({
      next: (res) => {
        this.otpVerifyLoading = false;

        if (this.authSvc.prepareSigning(res as any)) {
          return;
        }

        this.authVM.otpData = res;
        if (res.login_method === ActionMethod.Register) {
          this.authVM.changeFormState('signup');
          this.authVM.signupForm_mobileControl.setValue(
            this.authVM.userNameControl.value
          );
        }
      },
      error: (err: HttpErrorResponse) => {
        this.otpVerifyLoading = false;
        this.authVM.showErrorMessage(err.error.detail);
      },
    });
  }
}
