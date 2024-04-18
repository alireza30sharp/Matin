import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '@services';
import { AuthVMService } from '@share/services/auth-vm.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthVMService],
})
export class LoginComponent implements OnInit {
  constructor(
    public router$: Router,
    public authSvc: UserAuthService,
    public authVM: AuthVMService
  ) {}

  ngOnInit(): void {
    // if (this.authSvc.token && this.authSvc.validateToken(this.authSvc.token)) {
    //   this.router$.navigateByUrl('/');
    // }
  }
}
