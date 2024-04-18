import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { localStorageService } from '../../../services/localStorage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import * as uuid from 'uuid';
import * as XLSX from 'xlsx';
import {
  AgChartThemeOverrides,
  AsyncTransactionsFlushed,
  ChartToolPanelsDef,
  FirstDataRenderedEvent,
  GetRowIdFunc,
  GetRowIdParams,
  GridOptions,
  GridReadyEvent,
  ValueParserParams,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { AgGridMaster } from '@share/interfaces/aggrid-master';
import { AgGridInterFace } from '@share/interfaces/ag-grid.interface';
@Component({
  selector: 'ag-grid-data',
  templateUrl: './ag-grid-data.component.html',
  styleUrls: ['./ag-grid-data.component.scss'],
})
export class AgGridDataComponent extends AgGridMaster implements AfterViewInit {
  constructor(
    private _modalService: NgbModal,
    private _localStorageService: localStorageService
  ) {
    super(_modalService);
  }
  ngAfterViewInit(): void {
    if (this.idGrid) {
      this._localStorageService.getlocalStorage(this.idGrid).then((state) => {
        this.restoreState(state);
      });
    }
  }
  @Input() set isEditMode(flag: boolean) {
    this._isEditMode = flag;
  }
  @Input() set columnsDefault(columns: AgGridInterFace[]) {
    this.columnsTable = columns;
    if (this._isEditMode) {
      this.isShowToolbar = true;
      this.enableFillHandle = true;
      this.undoRedoCellEditing = true;
      this.enableCellChangeFlash = true;
      let col = columns.filter((col) => col.editable);
      if (col.length > 0) {
        let findEditing = col.find((f) => f.startEditing);
        if (findEditing) {
          this.startEditingCell = findEditing.field;
        } else {
          this.startEditingCell = col[0].field;
        }
        this.rowValue = this.extractFields(col, 'field');
        this.undoRedoCellEditingLimit = Object.keys(col).length;
      }
    }
  }
  @Input() defaultColDef: AgGridInterFace;
  @Input() autoGroupColumnDef: AgGridInterFace;
  @Input() popupParent: any;

  @Input() suppressAggFuncInHeader: boolean;
  @Input() set rowDataDefault(list: any[]) {
    this.rowData = list;
  }
  @Input() set showSideBar(option: boolean) {
    this.gridOptions.sideBar = option;
  }
  @Input() set isAgGridUpdate(value) {
    // this.agGridUpdate();
  }

  @Input() class: string = 'ag-theme-alpine';
  @Input() idGrid: string;
  @Output() selectedRowsChange = new EventEmitter<any>();
  @Output() removeCellChange = new EventEmitter<any>();
  @Output() editCellChange = new EventEmitter<any>();
  @Output() saveCellChange = new EventEmitter<any>();
  @Output() DesignerclickEvent = new EventEmitter<any>();
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.id;
  };
  public chartThemeOverrides: AgChartThemeOverrides = {
    common: {
      title: {
        enabled: true,
        text: 'Medals by Age',
      },
    },
    bar: {
      axes: {
        category: {
          label: {
            rotation: 0,
          },
        },
      },
    },
  };
  public chartToolPanelsDef: ChartToolPanelsDef = {
    panels: ['data', 'format'],
  };
  _isEditMode: boolean = false;
  rowValue: any;
  startEditingCell: string = null;
  columnsTable: AgGridInterFace[] = [];
  public asyncTransactionWaitMillis = 4000;
  changeModel = new Subject<void>();
  selectedRows: any;
  currentChartRef: any;
  recorder: any;
  isShowToolbar: boolean = false;
  currentRowDataEditing: any = {};
  ///------undo
  enableFillHandle: boolean = false;
  undoRedoCellEditing: boolean = false;
  undoRedoCellEditingLimit: number = 0;
  enableCellChangeFlash: boolean = false;
  onSelectionChanged() {
    this.selectedRows = this.gridApi.getSelectedRows();
    this.selectedRowsChange.emit(this.selectedRows);
  }
  designerclickEvent(event) {
    this.DesignerclickEvent.emit();
  }
  onStartFeed(newItems: any[]) {
    var resultCallback = () => {
      console.log('transactionApplied() - ');
    };
    this.gridApi.applyTransactionAsync({ update: newItems }, resultCallback);
  }
  override removeCell(row: any): void {
    this.removeCellChange.emit(row);
  }
  override editCell(row: any): void {
    this.editCellChange.emit(row);
  }

  private restoreState(state) {
    // let state = window.localStorage.getItem('save');
    setTimeout(() => {
      this.gridOptions.columnApi.applyColumnState({
        state: state,
        applyOrder: true,
      });
    }, 900);
  }
  onSave() {
    if (this.idGrid != '') {
      // this._localStorageService.setlocalStorage(
      //   this.idGrid,
      //  // this.gridOptions.columnApi.getColumnState()
      // );
    }
  }
  SaveSelected() {
    this.gridApi.stopEditing(true);
    this.agGridUpdate();
    let filter = this.rowData.filter((data) => data.isEdited);
    this.saveCellChange.emit(filter);
  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.createRangeChart({
      chartContainer: document.querySelector('#myChart') as HTMLElement,
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 79,
        columns: ['from', 'to', 'holeSectionSize'],
      },
      chartType: 'groupedColumn',
      aggFunc: 'sum',
    });
  }

  onNewSelected() {
    if (this.rowValue) {
      this.rowValue.isEdited = false;
      this.rowValue.uniqueId = uuid.v4();
      this.rowData.unshift(Object.assign({}, this.rowValue));
      this.agGridUpdate();
      this.startEditingCol(this.startEditingCell);
    }

    this.countItemEdited = this.getCountEdited();
  }
  extractFields(arr, field) {
    var result = {};
    arr.forEach(function (item) {
      result[item[field]] = null;
    });
    return result;
  }
  onCancel() {
    this.gridApi.stopEditing(true);
    this.rowData = this.rowData.filter((data) => data.isEdited == false);
    this.agGridUpdate();
  }
  onAsyncTransactionsFlushed(e: AsyncTransactionsFlushed) {
    console.log(
      '========== onAsyncTransactionsFlushed: applied ' +
        e.results.length +
        ' transactions'
    );
  }
  onFlushTransactions() {
    this.gridApi.flushAsyncTransactions();
  }

  //=====
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    try {
      if (target.files.length !== 1)
        throw new Error('Cannot use multiple files');
      let reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        let data: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });
        let headerRow = data.splice(0, 1);
        headerRow = headerRow.length ? headerRow[0] : [];
        let fromActMd = headerRow.indexOf('from Act');
        let toActMd = headerRow.indexOf('to Act');
        let date = headerRow.indexOf('Date');
        let sampleDescription = headerRow.indexOf('Description');
        let NOT_EXIST = -1;
        if ([fromActMd, toActMd, date, sampleDescription].includes(NOT_EXIST)) {
          return;
        }
        data = data.filter((row) => row.length);
        // row data
        data.forEach((row: any[]) => {
          let indexFinded = this.rowData.findIndex(
            (f) =>
              (f.key ? f.key.trim() : null) ==
              (row[toActMd] ? row[toActMd] : null)
          );
          // چک کن اگه مقادیر وارد شده با مقادیر قبلی فرق داشت فلگ ویرایش رو روشن کن
          // جهت جلوگیری از ارسال درخواست های اضافه
          let isEdited = false;
          if (indexFinded >= 0) {
            let currentItem = this.rowData[indexFinded];
            isEdited =
              currentItem.fromActMd != row[fromActMd] ||
              currentItem.toActMd != row[toActMd] ||
              currentItem.date != row[date] ||
              currentItem.sampleDescription != row[sampleDescription];
          } else {
            isEdited = true;
          }
          if (
            row[fromActMd] ||
            row[toActMd] ||
            row[date] ||
            row[sampleDescription]
          ) {
            let item: any = {
              isEdited,
              date: row[date],
              sampleDescription: row[sampleDescription],
              fromActMd: row[fromActMd],
              toActMd: row[toActMd],
              // isEdited,
              // repeat: null,
              // ar: row[arIndex],
              // fa: row[faIndex],
              // key: row[keyIndex],
              // id:
              //   indexFinded > -1 ? this.rowData[indexFinded].id || null : null,
            };
            if (indexFinded >= 0) {
              this.rowData[indexFinded] = item;
            } else {
              item.uniqueId = uuid.v4();
              this.rowData.unshift(item);
            }
          }
        });
        target['value'] = null;
        this.agGridUpdate();
        this.countItemEdited = this.getCountEdited();
      };
      reader.onerror = () => {
        target['value'] = null;
      };
      reader.readAsBinaryString(target.files[0]);
    } catch (ex) {
      target['value'] = null;
      evt.target.value = null;
    }
  }
}
// {
//   headerName: 'Total',
//   valueGetter: 'data.a + data.b + data.c + data.d',
//   enableValue: true,
//   aggFunc: 'sum',
//   valueFormatter: numberCellFormatter_valueFormatter,
//   cellClass: 'number',
//   cellRenderer: 'agAnimateShowChangeCellRenderer',
// },
// {
//   headerName: 'Average',
//   valueGetter: '(data.a + data.b + data.c + data.d) / 4',
//   minWidth: 135,
//   cellRenderer: 'agAnimateSlideCellRenderer',
// },
