import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MobileCheckService } from './services/is-mobile';
import { HighchartsChartModule } from 'highcharts-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
//////////* Mobile Templates *//////////
import { CompanyListComponent } from './pages/company-list/company-list.component';
import * as pipes from './pipes';
import * as _organisms from './components/organisms';
import * as _templates from './components/templates';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './pages/layout/layout.component';
import { CompanyRoutingModule } from './company-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShareModule } from '@share/share.module';
import { ClientPrerequisitsService } from './services/client-prerequisits';
import { CompanyProfileComponent } from './pages';
import { NgxPermissionsModule } from 'ngx-permissions';
export function MobileCheckServiceFactory(startupService: MobileCheckService) {
  return () => startupService.mobileCheck();
}
@NgModule({
  declarations: [
    _organisms.CompanyFormComponent,
    _organisms.CompanyPasswordChangeComponent,
    _templates.CompanyFormModalComponent,
    CompanyListComponent,
    CompanyProfileComponent,
    // Pipes
    pipes.HourPipe,
    LayoutComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    HttpClientModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
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
    ClientPrerequisitsService,
  ],

  exports: [CompanyListComponent],
})
export class CompanyModule {}
