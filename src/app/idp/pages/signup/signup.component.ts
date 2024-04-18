import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '~/services';
import { ToastService } from '~/share/services';
import { AuthVMService } from '~/share/services/auth-vm.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupLoading = false;

  constructor(
    public authVM: AuthVMService,
    public authSvc: UserAuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  signup() {
    if (this.signupLoading) {
      return;
    }

    this.authVM.clearError();
    this.signupLoading = true;

    this.authVM.createUserModel(this.authVM.signupForm.value).subscribe({
      next: (res) => {
        this.signupLoading = false;

        if (this.authSvc.prepareSigning(res)) {
          return;
        }

        this.authVM.showErrorMessage('');
      },
      error: (err) => {
        if (err.error.detail) {
          this.toastService.error(err.error.detail);
        }
        this.signupLoading = false;
        this.authVM.showErrorMessage(
          'ثبت اطلاعات با خطا مواجه شده است. لطفا مجدد سعی نمایید.'
        );
      },
    });
  }
}
