import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { CompanyService } from '../../services';
import { ITabBarModel } from '@share/models';
import { AgGridInterFace } from '@share/interfaces/ag-grid.interface';
import { companyInput, companyInsert, companyModel } from '../../models';
import { ToastService } from '@share/services';
import { CompanyFormModalComponent } from '../../components/templates/company-form-modal/company-form-modal.component';
import { ModalService } from '@share/services/modal.service';
import { ReportComponent } from '@share/components';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  providers: [CompanyService],
})
export class CompanyListComponent implements OnInit {
  type = 'ag-theme-balham';
  rowDataDefault = [];
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
    width: 300,
    sortable: true,
    resizable: true,
    enableRowGroup: true,
    enablePivot: true,
    filter: true,
    floatingFilter: true,
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
    flex: 1,
    minWidth: 200,
    enableValue: true,
    filterParams: true,
    chartDataType: 'series',
  };

  columnsDefault: AgGridInterFace[] = [
    {
      field: 'row_NO',
      headerName: 'row_NO',
      hide: true,
    },
    {
      field: 'id',
      hide: true,
    },
    {
      field: 'componyUniqCode',
      headerName: 'کد شرکت',
      filterParams: true,
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'componyName',
      headerName: 'نام شرکت',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'cityId',
      headerName: 'کد شهر',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'cityName',
      enableRowGroup: true,
      enablePivot: true,
      headerName: 'نام شهر',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'componyTel',
      headerName: 'تلفن شرکت',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'componyAddress',
      headerName: 'آدرس شرکت',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'companyMobile',
      headerName: 'تلفن شرکت',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'statusId',
      headerName: 'کد وضعیت',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'companyTypeId',
      headerName: 'نوع شرکت',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'companyStatuesName',
      headerName: 'نام وضعیت',
      enableRowGroup: true,
      enablePivot: true,
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'companyTypeName',
      headerName: 'نام نوع شرکت',
      suppressSizeToFit: true,
      enableRowGroup: true,
      enablePivot: true,
      sortable: true,
      filter: 'agTextColumnFilter',
    },
  ];
  companyInput: companyInput = new companyInput();
  companyModel: companyModel;
  constructor(
    private _modalService: ModalService,
    private companyService: CompanyService,
    private readonly _toaster: ToastService
  ) {}

  ngOnInit(): void {
    this.getCompanies();
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
    this.companyInput.PageSize = this.pageSize;
    this.companyInput.PageNumber = this.page;

    this.getCompanies();
  }
  onSelectedRowsChangeEvent(event: Array<companyModel>) {
    this.selectRow = new Array<companyModel>();
    this.selectRow = event;
  }
  onDeleteItem(item: companyModel) {
    this.companyService.deleteCompany(item.id).subscribe((res) => {
      if (res.isOk) {
        this.getCompanies();
      }
    });
  }
  // saveState() {
  //   window.localStorage.setItem(
  //     'save',
  //     JSON.stringify(this.gridOptions.columnApi.getColumnState())
  //   );

  // }
  removeCell() {
    if (this.selectRow.length) {
      for (let i = 0; i <= this.selectRow.length; i++) {
        this.onDeleteItem(this.selectRow[i]);
      }
    } else {
      this._toaster.error('لطفا یک رکورد انتخاب شود');
    }
  }
  // override editCell(row: any): void {
  //   var modalRef = this._modalService.open(CompanyFormModalComponent, {
  //     size: 'xl',
  //     centered: true,
  //     backdrop: 'static',
  //   });

  //   modalRef.componentInstance.companyModel = {
  //     companyId: row.companyId,
  //     companyUniqCode: row.companyUniqCode,
  //     companyName: row.componyName,
  //     cityId: row.cityId,
  //     companyPassword: row.companyPassword,
  //     companyTel: row.companyTel,
  //     companyAddress: row.companyAddress,
  //     companyType: row.companyType,
  //     companyMobile: row.companyMobile,
  //     id: row.id,
  //   };
  //   modalRef.result.then((res) => {
  //     this.updateOrInsertCompany(res);
  //   });
  // }
  openModal() {
    this._modalService
      .open(CompanyFormModalComponent, 'lg')
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
  updateOrInsertCompany(model: companyInsert) {
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
  changed() {
    // this._filter.filter = this.companyInput;
    // this._filter.columnState = this.gridOptions.columnApi.getColumnState();
    // this.onSomething.emit(this._filter);
  }
}
