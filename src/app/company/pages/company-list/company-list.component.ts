import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { CompanyService } from '../../services';
import { ITabBarModel } from '@share/models';
import { AgGridInterFace } from '@share/interfaces/ag-grid.interface';
import { companyInput, companyModel } from '../../models';
import { ToastService } from '@share/services';
import { CompanyFormModalComponent } from '../../components/templates/company-form-modal/company-form-modal.component';
import { ModalService } from '@share/services/modal.service';
import { ReportComponent } from '@share/components';
import { UserAuthService } from '@services';
import { propertyOf } from '@share/utilities/property-of';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  providers: [CompanyService],
})
export class CompanyListComponent implements OnInit {
  type = 'ag-theme-balham';
  rowDataDefault = new Array<companyModel>();
  selectRow = new Array<companyModel>();
  totalCount = 0;
  selectedRows: any;
  page = 0;
  pageSize = 10;
  changeModel = new Subject<void>();
  _filter: ITabBarModel;
  @Input() set input(data: ITabBarModel) {
    this._filter = data;
    if (data.filter) {
      this.companyInput = Object.assign({}, data.filter);
      this.restoreState(data.columnState);
    }
  }
  @Output()
  onSomething = new EventEmitter<ITabBarModel>();
  public favoriteColor = '#26ab3c';
  public rowSelection = 'multiple';
  public defaultColDef: AgGridInterFace = {
    suppressSizeToFit: true,
    enableRowGroup: true,
    enablePivot: true,
    sortable: true,
    filterParams: true,
    width: 300,
    resizable: true,
    filter: true,
    floatingFilter: true,
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
    flex: 1,
    minWidth: 200,
    enableValue: true,

    chartDataType: 'series',
  };

  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<companyModel>('row_NO'),
      headerName: 'row_NO',
      hide: true,
    },
    {
      field: propertyOf<companyModel>('companyId'),
      hide: true,
    },
    {
      field: propertyOf<companyModel>('statusId'),
      headerName: 'کد وضعیت',
    },
    {
      field: propertyOf<companyModel>('companyTypeId'),
      headerName: 'نوع شرکت',
      hide: true,
    },
    {
      field: propertyOf<companyModel>('companyUniqCode'),
      headerName: 'کد شرکت',
      filter: 'agTextColumnFilter',
    },
    {
      field: propertyOf<companyModel>('companyName'),
      headerName: 'نام شرکت',
      filter: 'agTextColumnFilter',
    },
    {
      field: propertyOf<companyModel>('companyTypeName'),
      headerName: 'نوع شرکت',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'cityId',
      headerName: 'کد شهر',
      hide: true,
    },
    {
      field: propertyOf<companyModel>('cityName'),
      headerName: 'نام شهر',
      filter: 'agTextColumnFilter',
    },
    {
      field: propertyOf<companyModel>('companyTel'),
      headerName: 'تلفن شرکت',
      filter: 'agTextColumnFilter',
    },
    {
      field: propertyOf<companyModel>('companyAddress'),
      headerName: 'آدرس شرکت',
  
      filter: 'agTextColumnFilter',
    },
    {
      field: propertyOf<companyModel>('companyMobile'),
      headerName: 'تلفن شرکت',
      filter: 'agTextColumnFilter',
    },

    {
      field: propertyOf<companyModel>('companyStatusName'),
      headerName: 'وضعیت',
      filter: 'agTextColumnFilter',
    },
  ];
  companyInput: companyInput = new companyInput();
  companyModel: companyModel;
  constructor(
    private _modalService: ModalService,
    private companyService: CompanyService,
    private readonly _toaster: ToastService,
    private _userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.getCompanies();
    // this._userAuthService.user$.subscribe((user) => {
    //   this.companyInput.Id = user.companyId;
    //   this.companyInput.CompanyName = user.companyName;
    //   this.companyInput.CompanyTypeId = user.companyTypeId;
    //   this.companyInput.CompanyUniqCode = user.uniqCode;
    // });
  }

  getCompanies() {
    this.companyService.getCompanies(this.companyInput).subscribe((list) => {
      if (list.data) {
        this.rowDataDefault = list.data.data;
        //this.totalCount = list.data.totalCount;
      }
    });
  }
  displayActivePage(ev: any) {
    this.getCompanies();
  }
  onSelectedRowsChangeEvent(event: Array<companyModel>) {
    this.selectRow = new Array<companyModel>();
    this.selectRow = event;
  }
  onRefrashSelected(){
    this.getCompanies();
  }
  onDeleteItem(item: companyModel) {
    this.companyService.deleteCompany(item.companyId).subscribe((res) => {
      if (res.isOk) {
        this.getCompanies();
      }
    });
  }

  removeCell() {
    if (this.selectRow.length) {
      for (let i = 0; i <= this.selectRow.length; i++) {
        this.onDeleteItem(this.selectRow[i]);
      }
    } else {
      this._toaster.error('لطفا یک رکورد انتخاب شود');
    }
  }

  openModal(isEdit: false) {
    let entryId = null;
    if (isEdit) {
      entryId = this.selectRow[0].companyId;
    }
    this._modalService
      .open(CompanyFormModalComponent, 'lg', { entryId: entryId })
      .then((value) => {})
      .catch((err) => {});
  }
  onSelectionChanged() {
    // this.selectedRows = this.gridApi.getSelectedRows();
  }

  restoreState(state) {
    // let state = window.localStorage.getItem('save');
    // setTimeout(() => {
    //   this.gridOptions.columnApi.applyColumnState({
    //     state: state,
    //     applyOrder: true,
    //   });
    // }, 900);
  }
  editSelected() {}
  updateOrInsertCompany(model: companyModel) {
    this.companyService.updateCompany(model).subscribe((res) => {
      if (res.isOk) {
        this._toaster.success(res.messages.join(''));
      } else {
        this._toaster.error(res.messages.join(''));
      }
    });
  }
  onDesignerclickEvent(event) {
    let list = [
      {
        from: 12,
        to: 11,
      },
      {
        from: 13,
        to: 25,
      },
    ];
    let data = {
      rigName: 'test',
    };

    let test = {
      bls: 'aaaaaaaaaaaaaaaaa',
    };
    this._modalService.open(ReportComponent, 'xl', {
      data: { ReportGeneral: { ...data, ...test } },
      dataSetName: 'General,Test',
      reportName: 'ReportGeneral',
    });
  }
}
