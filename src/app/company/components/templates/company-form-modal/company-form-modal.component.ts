import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingStateFrom } from '@share/models/loadingState';
import { ToastService } from '@share/services';
import { finalize } from 'rxjs';
import { companyInsert } from 'src/app/company/models';
import { CompanyService } from 'src/app/company/services';
@Component({
  selector: 'app-company-form-modal',
  templateUrl: './company-form-modal.component.html',
  styleUrls: ['./company-form-modal.component.scss'],
  providers: [CompanyService],
})
export class CompanyFormModalComponent
  extends LoadingStateFrom
  implements OnInit
{
  @Input() entryId?: number;
  initialData?: companyInsert = new companyInsert();
  readonly submitButtonId: string = 'submit-button';
  isEditMode?: boolean;
  isLoading?: boolean;
  isResetForm?: boolean;
  ngOnInit(): void {
    this.isEditMode = !!this.entryId;
    this._getInitialData();
  }
  constructor(
    private _activeModal: NgbActiveModal,
    private _toastService: ToastService,
    private _companyService: CompanyService
  ) {
    super();
  }
  private _getInitialData() {
    this.isLoading = true;
    if (this.isEditMode) {
      this._companyService.getCompaniyById(this.entryId).subscribe((res) => {
        if (res.isOk) {
          this.initialData = res.data;
        }
      });
    }
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
  }
  saveHandler(data: companyInsert) {
    this.isResetForm = Object.assign(false, false);
    if (this.isLoadingForm) {
      this._toastService.error('::Please_Wait_While_Executing_The_Request');
      return;
    }
    this.startLoading();
    if (this.entryId) {
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
              this._toastService.success('با موفقیت ویرایش  شد');
            }
          },
          error: (err) => {
            this.isResetForm = false;
            let msg = '';
            if (err.error.messages) {
              this._toastService.error(err.error.messages);
              msg = err.error.messages.join(' ');
            } else if (err.error.message) {
              this._toastService.error(err.error.message);
              msg = err.error.message.join(' ');
            }
          },
        });
    } else {
      this._companyService
        .createCompany(data as any)
        .pipe(
          finalize(() => {
            this.finalize();
          })
        )
        .subscribe({
          next: (res) => {
            if (res.isOk) {
              this._toastService.success('با موفقیت ثبت شد');
            }
          },
          error: (err) => {
            let msg = '';
            if (err.error.messages) {
              this._toastService.error(err.error.messages);
              msg = err.error.messages.join(' ');
            } else if (err.error.message) {
              this._toastService.error(err.error.message);
              msg = err.error.message.join(' ');
            }
          },
        });
    }
  }
  cancelHandler() {
    this._activeModal.close(false);
  }
}
