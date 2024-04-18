import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MobileCheckService } from './services/is-mobile';
import { HighchartsChartModule } from 'highcharts-angular';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
//////////* Mobile Templates *//////////
import { SidebarMobileComponent } from './sidebar/sidebar-mobile/sidebar-mobile.component';
import * as pgs from './pages';
import { CommonModule } from '@angular/common';
import { ShareModule } from '~/share/share.module';
import { AppRoutingModule } from './app-routing.module';
import { CompanyModule } from '~/company/company.module';

export function MobileCheckServiceFactory(startupService: MobileCheckService) {
  return () => startupService.mobileCheck();
}

@NgModule({
  declarations: [pgs.LayoutComponent, SidebarComponent, SidebarMobileComponent],
  imports: [
    ShareModule.forChild(),
    CommonModule,
    ShareModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HighchartsChartModule,
    DragDropModule,
    AppRoutingModule,
    CompanyModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: MobileCheckServiceFactory,
      deps: [MobileCheckService],
      multi: true,
    },
  ],
  exports: [SidebarComponent],
})
export class AppModule {}
