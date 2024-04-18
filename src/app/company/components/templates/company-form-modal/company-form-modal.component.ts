import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingStateFrom } from '~/share/models/loadingState';
import { companyInsert } from '~/company/models';
import { ToastService } from '~/share/services';
@Component({
  selector: 'app-company-form-modal',
  templateUrl: './company-form-modal.component.html',
  styleUrls: ['./company-form-modal.component.scss'],
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
  ngOnInit(): void {
    this.isEditMode = !!this.entryId;
    this._getInitialData();
  }
  constructor(
    private _activeModal: NgbActiveModal,
    private _toastService: ToastService
  ) {
    super();
  }
  private _getInitialData() {
    this.isLoading = true;
    if (this.isEditMode) {
    }
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
  }
  saveHandler(data: companyInsert) {
    if (this.isLoadingForm) {
      this._toastService.error('::Please_Wait_While_Executing_The_Request');
      return;
    }
    this.startLoading();
  }
  cancelHandler() {
    this._activeModal.close(false);
  }
}
