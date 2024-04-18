import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AgGridMaster } from '../../../partial-pages/aggrid-master';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Subject, debounceTime } from 'rxjs';
import { ToastService } from '~/share/services';
import { ITabBarModel } from '~/share/models';
import { CompanyService } from '~/company/services';
import { companyInput, companyInsert, companyModel } from '~/company/models';
import { CompanyFormModalComponent } from '~/company/components/templates';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  providers: [CompanyService],
})
export class CompanyListComponent extends AgGridMaster implements OnInit {
  type = 'ag-theme-balham';
  rowDataDefault = [];
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
  public defaultColDef: ColDef = {
    width: 120,
    sortable: true,
    resizable: true,
    enableRowGroup: true,
    enablePivot: true,
    flex: 1,
    minWidth: 100,
    // allow every column to be aggregated
    enableValue: true,
    chartDataType: 'series',
  };
  public autoGroupColumnDef: ColDef = {
    width: 250,
  };
  columnsDefault: ColDef[] = [
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
    private _modalService: NgbModal,
    private companyService: CompanyService,
    private readonly _toaster: ToastService
  ) {
    super(_modalService);
  }

  ngOnInit(): void {
    this.changeModel.pipe(debounceTime(900)).subscribe((res) => {
      this.changed();
    });
  }

  getCompanies() {
    this.companyService.getCompanies(this.companyInput).subscribe((list) => {
      if (list.data) {
        this.rowDataDefault = list.data.data;
        this.totalCount = list.data.totalCount;
      }
    });
  }
  displayActivePage(ev: any) {
    this.companyInput.PageSize = this.pageSize;
    this.companyInput.PageNumber = this.page;

    this.getCompanies();
  }
  // saveState() {
  //   window.localStorage.setItem(
  //     'save',
  //     JSON.stringify(this.gridOptions.columnApi.getColumnState())
  //   );

  // }
  override removeCell(row) {
    this.companyService.deleteCompany(row.id).subscribe((res) => {
      if (res.isOk) {
        this._toaster.success(res.message);
        this.getCompanies();
      } else {
        this._toaster.error(res.message);
      }
    });
  }
  override editCell(row: any): void {
    var modalRef = this._modalService.open(CompanyFormModalComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.companyModel = {
      companyId: row.companyId,
      companyUniqCode: row.companyUniqCode,
      companyName: row.componyName,
      cityId: row.cityId,
      companyPassword: row.companyPassword,
      companyTel: row.companyTel,
      companyAddress: row.companyAddress,
      companyType: row.companyType,
      companyMobile: row.companyMobile,
      id: row.id,
    };
    modalRef.result.then((res) => {
      this.updateOrInsertCompany(res);
    });
  }
  openModal() {
    var modalRef = this._modalService.open(CompanyFormModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.companyModel = {
      entryId: 12,
    };
    modalRef.result.then((res) => {
      this.updateOrInsertCompany(res);
    });
  }
  onSelectionChanged() {
    this.selectedRows = this.gridApi.getSelectedRows();
  }

  restoreState(state) {
    // let state = window.localStorage.getItem('save');
    setTimeout(() => {
      this.gridOptions.columnApi.applyColumnState({
        state: state,
        applyOrder: true,
      });
    }, 900);
  }
  updateOrInsertCompany(model: companyInsert) {
    this.companyService.updateCompany(model).subscribe((res) => {
      if (res.isOk) {
        this._toaster.success(res.message);
      } else {
        this._toaster.error(res.message);
      }
    });
  }

  changed() {
    // this._filter.filter = this.companyInput;
    // this._filter.columnState = this.gridOptions.columnApi.getColumnState();
    // this.onSomething.emit(this._filter);
  }
}
