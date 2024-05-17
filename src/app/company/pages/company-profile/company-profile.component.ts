import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime, finalize } from 'rxjs';
import { CompanyService } from '../../services';
import { ITabBarModel } from '@share/models';
import { AgGridInterFace } from '@share/interfaces/ag-grid.interface';
import {
  companyInput,
  companyModel,
  updateCompanyPasswordDto,
} from '../../models';
import { ToastService } from '@share/services';
import { CompanyFormModalComponent } from '../../components/templates/company-form-modal/company-form-modal.component';
import { ModalService } from '@share/services/modal.service';
import { ReportComponent } from '@share/components';
import { UserAuthService } from '@services';
import { propertyOf } from '@share/utilities/property-of';
import { LoadingStateFrom } from '@share/models/loadingState';
type FormType = 'info' | 'pass';
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
  providers: [CompanyService],
})
export class CompanyProfileComponent
  extends LoadingStateFrom
  implements OnInit
{
  submitButtonId: string = '';
  // readonly submitChangeButtonId: string = 'submit-button-password';
  initialData?: companyModel = new companyModel();
  isResetForm?: boolean = false;
  isLoading?: boolean;
  selectRow = new Array<companyModel>();
  selectedRows: any;
  companyInput: companyInput = new companyInput();
  companyModel: companyModel;
  formSubmitButtonIds: Record<FormType, string> = {
    info: 'submit-button',
    pass: 'submit-button-password',
  };
  constructor(
    private _modalService: ModalService,
    private _companyService: CompanyService,
    private readonly _toaster: ToastService,
    private _userAuthService: UserAuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this._userAuthService.user$.subscribe((user) => {
      this.companyInput.companyId = user.companyId;
      this.companyInput.companyUniqCode = user.uniqCode;
      this._getInitialData();
    });
  }
  private _getInitialData() {
    this.isLoading = true;
    this._companyService
      .getCompaniyById(this.companyInput.companyId)
      .subscribe((res) => {
        if (res.isOk) {
          this.initialData = res.data;
        }
        this.isLoading = false;
      });
  }
  saveHandler(data: companyModel) {
    this.isResetForm = Object.assign(false, false);
    if (this.isLoadingForm) {
      this._toaster.error('در حال پردازش لطفا شکیبا باشید');
      return;
    }
    this.startLoading();
    this._companyService
      .updateCompany(data as any)
      .pipe(
        finalize(() => {
          this.finalize();
        })
      )
      .subscribe({
        next: (res) => {
          if (res.isOk) {
            this.isResetForm = true;
            this._toaster.success('با موفقیت ویرایش  شد');
          }
        },
        error: (err) => {
          this.isResetForm = false;
          let msg = '';
          if (err.error.messages) {
            this._toaster.error(err.error.messages);
            msg = err.error.messages.join(' ');
          } else if (err.error.message) {
            this._toaster.error(err.error.message);
            msg = err.error.message.join(' ');
          }
        },
      });
  }
  savePasswordHandler(data: updateCompanyPasswordDto) {
    data.companyUniqCode = this.companyInput.companyUniqCode;
    if (this.isLoadingForm) {
      this._toaster.error('در حال پردازش لطفا شکیبا باشید');
      return;
    }
    this.startLoading();
    this._companyService
      .updatePasswordCompany(data)
      .pipe(
        finalize(() => {
          this.finalize();
        })
      )
      .subscribe({
        next: (res) => {
          if (res.isOk) {
            this.isResetForm = true;
            this._toaster.success('با موفقیت ویرایش  شد');
          }
        },
        error: (err) => {
          this.isResetForm = false;
          let msg = '';
          if (err.error.messages) {
            this._toaster.error(err.error.messages);
            msg = err.error.messages.join(' ');
          } else if (err.error.message) {
            this._toaster.error(err.error.message);
            msg = err.error.message.join(' ');
          }
        },
      });
  }
  private _submitForm(elm) {
    debugger;
    const button = document.getElementById(
      this.formSubmitButtonIds[elm]
    ) as HTMLButtonElement;

    button.click();
  }
  saveClickHandler() {
    this._submitForm(this.submitButtonId);
  }
}
