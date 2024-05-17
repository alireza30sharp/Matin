import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UserAuthService } from '@services';
import { AgGridInterFace } from '@share/interfaces/ag-grid.interface';
import { ReportService } from '@share/services/report.service';
@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
  providers: [ReportService],
})
export class ReportListComponent implements OnInit, AfterViewInit {
  CompanyId: number;
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
      field: 'id',
      hide: true,
    },
    {
      field: 'reportTitle',
      headerName: 'عنوان گزارش',
      filterParams: true,
      suppressSizeToFit: true,
      sortable: true,
      headerCheckboxSelection: true,
      filter: 'agTextColumnFilter',
      width: 250,
    },
    {
      field: 'countPrint',
      headerName: 'تعداد چاپ',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
      width: 100,
    },
    {
      field: 'prev',
      headerName: 'پیش نمایش',
      suppressSizeToFit: true,
      sortable: true,
      cellEditor: 'agCheckboxCellEditor',
      width: 10,
      editable: true,
    },
    {
      field: 'showSetting',
      enableRowGroup: true,
      enablePivot: true,
      headerName: 'نمایش تنظیمات',
      suppressSizeToFit: true,
      sortable: true,
      cellEditor: 'agCheckboxCellEditor',
      editable: true,
      width: 10,
    },
    {
      field: 'nameFile',
      headerName: 'نام فایل',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
      width: 100,
    },
  ];
  rowDataDefault = [
    {
      reportTitle: 'گزارش جدید',
      countPrint: 2,
      prev: false,
      showSetting: false,
      nameFile: 'Rep_2188',
    },
    {
      reportTitle: 'گزارش حساب',
      countPrint: 2,
      prev: false,
      showSetting: false,
      nameFile: 'Rep_2188',
    },
    {
      reportTitle: 'گزارش با جزویات',
      countPrint: 2,
      prev: false,
      showSetting: false,
      nameFile: 'Rep_2188',
    },
  ];
  constructor(
    private _userAuthService: UserAuthService,
    private _reportService: ReportService
  ) {
    this._userAuthService.user$.subscribe((user) => {
      this.CompanyId = user.companyId;
    });
  }
  onSelectedRowsChangeEvent(e) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.getReports();
  }
  removeCell() {}
  getReports() {
    this._reportService.GetReports(0, this.CompanyId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  openModal() {}
  onDesignerclickEvent(e) {}
}
