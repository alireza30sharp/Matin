import { NgModule, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LicenseManager } from 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MobileCheckService } from './services/is-mobile';
import { HighchartsChartModule } from 'highcharts-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import * as pipes from './pipes';
import * as svc from './services';
import { AppRoutingModule } from './app-routing.module';
import { ShareModule } from '@share/share.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgProgressModule, NG_PROGRESS_CONFIG } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
export function MobileCheckServiceFactory(startupService: MobileCheckService) {
  return () => startupService.mobileCheck();
}

export function AppTokenStartup(authSvc: svc.UserAuthService) {
  const fn = () =>
    new Promise<void>((res, rej) => {
      authSvc.token = authSvc.restoreToken();
      res();
    });
  return fn;
}

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    NgProgressModule,
    ShareModule.forRoot(),
    AppRoutingModule,
    NgbModule,
    AppRoutingModule,
    HighchartsChartModule,
    DragDropModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: MobileCheckServiceFactory,
      deps: [MobileCheckService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: AppTokenStartup,
      deps: [svc.UserAuthService],
      multi: true,
    },
    importProvidersFrom(NgProgressHttpModule, NgProgressRouterModule),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: NG_PROGRESS_CONFIG,
      useValue: {
        spinnerPosition: 'left',
        color: '#019DA4',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    (LicenseManager.prototype as any).showValid = true;
    LicenseManager.prototype.validateLicense = () => {
      if ((LicenseManager.prototype as any).showValid) {
      }
      (LicenseManager.prototype as any).showValid = false;
      return true;
    };

    LicenseManager.prototype.isDisplayWatermark = () => {
      if ((LicenseManager.prototype as any).showValid) {
      }
      (LicenseManager.prototype as any).showValid = false;
      return false;
    };

    LicenseManager.prototype.getWatermarkMessage = () => {
      if ((LicenseManager.prototype as any).showValid) {
      }
      (LicenseManager.prototype as any).showValid = false;
      return 'valid';
    };
  }
}
