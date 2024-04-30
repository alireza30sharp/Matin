import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AgGridInterFace } from '@share/interfaces/ag-grid.interface';
@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit, AfterViewInit {
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
  constructor() {}
  onSelectedRowsChangeEvent(e) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {}
  removeCell() {}

  openModal() {}
  onDesignerclickEvent(e) {}
}
