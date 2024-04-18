import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { IntroComponent } from './pages/intro/intro.component';
import { LoginComponent } from './pages/login/login.component';
import { SigningComponent } from './pages/signing/signing.component';
import { SignupComponent } from './pages/signup/signup.component';
const routes: Routes = [
  // { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
      },
      // {
      //   path: '',
      //   component: IntroComponent,
      // },
      {
        path: 'sign-up-in',
        component: SigningComponent,
      },
      {
        path: 'sign-up',
        component: SignupComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdpRoutingModule {}
