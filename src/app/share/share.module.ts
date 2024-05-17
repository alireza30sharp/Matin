import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import * as _shareSvc from '@share/services';
import * as _shareCmp from '@share/components';
import * as _shareDir from '@share/directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import * as _sharePipe from '@share/pipes';
import { DynamicModule } from 'ng-dynamic-component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from './material.module';

import { SkeletonLoadingDirective } from './directives/skeleton-loading.directive';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import * as Ag from 'ag-grid-angular';
import * as _templates from './components/templates';
import * as _organisms from './components/organisms';
import * as grid from './components/ag-grid';

import * as kiComponent from './ki-components';
import { SafeIframeUrlPipe } from './ki-components/ki-iframe/safe-iframe-url.pipe';
import { MainTemplateMobileComponent } from '../dashboard/main-template-mobile/main-template-mobile.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthInterceptorService } from '../services/auth-interceptor.service';
import { NgxPermissionsModule } from 'ngx-permissions';
const component = [
  kiComponent.KiButtonComponent,
  kiComponent.KiCheckboxComponent,
  kiComponent.KiConfirmationComponent,
  kiComponent.KiDatePickerComponent,
  kiComponent.KiFileInputComponent,
  kiComponent.KiFormGroupComponent,
  kiComponent.KiIframeComponent,
  kiComponent.KiInputComponent,
  kiComponent.KiSpinnerComponent,
  kiComponent.KiSwitchComponent,
  kiComponent.KiTabComponent,
  kiComponent.KiTabGroupComponent,
  kiComponent.kiSelectComponent,
  kiComponent.kiModalComponent,
  kiComponent.UiTileComponent,
  kiComponent.KiValidationComponent,
  kiComponent.KiTextareaComponent,
  _templates.GeneralLayoutComponent,
  _templates.GeneralPanelComponent,
  _templates.PushPullPanelComponent,
  _organisms.GeneralHeaderComponent,
  grid.DateFilterComponent,
  grid.DateSelectCellRenderer,
  grid.AgLink,
  grid.AssignmentCellRenderer,
  grid.CellEditable,
  grid.CheckClickable,
  grid.ClickableAgent,
  grid.ConvertDateCellRenderer,
  grid.DeleteCellRenderer,
  grid.FlagStateCellRenderer,
  grid.percentCalc,
  grid.CurrencyRendererComponent,
  grid.SliderFilterComponent,
  grid.AgGridDataComponent,
  _shareCmp.ReportComponent,
  _shareCmp.AlertComponent,
  _shareCmp.ReportListComponent,
  SafeIframeUrlPipe,
];
@NgModule({
  declarations: [
    _sharePipe.SafeUrlPipe,
    _shareDir.DefaultImage,
    _shareCmp.PinCodeComponent,
    _shareCmp.FromComponent,
    _shareCmp.ChartLoadingComponent,
    _shareCmp.PostLoadingComponent,
    _shareCmp.SkeletonLoadingComponent,
    _shareCmp.ToolsBarComponent,
    SkeletonLoadingDirective,
    MainTemplateMobileComponent,
    DashboardComponent,
    ...component,
  ],
  imports: [
    FormsModule,
    DynamicModule,
    ReactiveFormsModule,
    NgxPermissionsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    RouterModule,
    CommonModule,
    NgSelectModule,
    Ag.AgGridModule,
    NgbModule,
    MaterialModule,
  ],

  providers: [
    _sharePipe.SafeUrlPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  exports: [
    _shareDir.DefaultImage,
    _sharePipe.SafeUrlPipe,
    DynamicModule,
    ReactiveFormsModule,
    NgxPermissionsModule,
    Ag.AgGridModule,
    _shareCmp.PinCodeComponent,
    _shareCmp.FromComponent,
    _shareCmp.ChartLoadingComponent,
    _shareCmp.PostLoadingComponent,
    _shareCmp.SkeletonLoadingComponent,
    _shareCmp.ToolsBarComponent,
    ...component,
    ToastrModule,
    NgSelectModule,
    NgbModule,
    MaterialModule,
    SkeletonLoadingDirective,
    MainTemplateMobileComponent,
    DashboardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShareModule {
  static forRoot() {
    return {
      ngModule: ShareModule,
    };
  }

  static forChild() {
    return {
      ngModule: ShareModule,
    };
  }
}
