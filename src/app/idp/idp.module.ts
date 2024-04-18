import { CUSTOM_ELEMENTS_SCHEMA, Component, NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { IntroComponent } from './pages/intro/intro.component';
import { IdpRoutingModule } from './idp-routing.module';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { LoginComponent } from './pages/login/login.component';
import { SigningComponent } from './pages/signing/signing.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutComponent,
    IntroComponent,
    SignupComponent,
    SigningComponent,
    LoginComponent,
  ],
  imports: [
    ShareModule.forChild(),
    IdpRoutingModule,
    CommonModule,
    ShareModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IdpModule {}
