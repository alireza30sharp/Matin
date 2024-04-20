import {
  GridOptions,
  GridApi,
  ColDef,
  GetDataPath,
  ValueFormatterParams,
  ValueParserParams,
} from 'ag-grid-community';
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
export class AgGridMaster {
  modalRef: NgbModal;
  loading = false;
  data = [];
  countItemEdited = 0;
  countItemSelected = 0;
  selectRow = {};
  top = 50;
  skip = 0;
  gridApi: GridApi;
  rowData = [];

  loadmoreFlag = false;

  overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">در حال بارگذاری</span>';

  overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">رکوردی یافت نشد</span>';

  gridOptions: GridOptions = {
    // allow every column to be aggregated
    // allow every column to be grouped
    // allow every column to be pivoted
    pivotColumnGroupTotals: 'before',
    enableRangeSelection: true,
    rowSelection: 'multiple',
    suppressDragLeaveHidesColumns: true,
    suppressMakeColumnVisibleAfterUnGroup: true,
    rowGroupPanelShow: 'always',
    // sideBar: true,
    sideBar: {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          minWidth: 225,
          width: 225,
          maxWidth: 225,
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
          minWidth: 180,
          maxWidth: 400,
          width: 250,
        },
      ],
      position: 'right',
      defaultToolPanel: '',
    },
    enableRtl: true,
    localeText: agGridLocaleText,
    animateRows: true,
    enableCharts: true,
    context: {
      thisComponent: this,
    },
    statusBar: {
      statusPanels: [
        { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
        { statusPanel: 'agTotalRowCountComponent', align: 'center' },
        { statusPanel: 'agFilteredRowCountComponent' },
        { statusPanel: 'agSelectedRowCountComponent' },
        { statusPanel: 'agAggregationComponent' },
      ],
    },
  };
  rowClassRules: any;
  ckeditorConfig = {
    height: '250px',
    width: '100%',
    language: 'fa',
    skin: 'kama',
    removePlugins: 'elementspath',
  };

  constructor(public modalService: NgbModal) {}

  onFilterChanged($event) {}

  onGridReady(params) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();

    var columnDefs = this.gridApi.getColumnDefs();

    this.gridApi.setColumnDefs(columnDefs as any);
    if (params.api.setGridOption) {
      params.api.setGridOption('rowData', this.rowData);
      this.startFeed(params.api);
    }
  }
  startFeed(api: GridApi) {
    debugger;
    var count = 1;
    setInterval(() => {
      var thisCount = count++;
      var updatedIndexes: any = {};
      var newItems: any[] = [];
      for (var i = 0; i < UPDATE_COUNT; i++) {
        // pick one index at random
        var index = Math.floor(Math.random() * this.rowData.length);
        // dont do same index twice, otherwise two updates for same row in one transaction
        if (updatedIndexes[index]) {
          continue;
        }
        var itemToUpdate = this.rowData[index];
        var newItem: any = copyObject(itemToUpdate);
        // copy previous to current value
        newItem.previous = newItem.current;
        // then create new current value
        newItem.current = Math.floor(Math.random() * 100000) + 100;
        newItems.push(newItem);
      }
      var resultCallback = () => {
        console.log('transactionApplied() - ' + thisCount);
      };
      api.applyTransactionAsync({ update: newItems }, resultCallback);
      console.log('applyTransactionAsync() - ' + thisCount);
    }, 500);
  }
  onRowClicked(item) {}

  handleScroll(event) {
    if (!this.loadmoreFlag) return;

    const grid = document.getElementById('defaultGrid');
    if (grid) {
      const gridBody = grid.querySelector('.ag-body-viewport') as any;
      const scrollPos = gridBody.offsetHeight + event.top;
      const scrollDiff = gridBody.scrollHeight - scrollPos;

      if (scrollDiff <= 3) {
        this.skip += this.top;
        this.loadMore(this.skip, this.top);
      }
    }
  }

  setData(data: any[]) {
    this.data = data as any;
    setTimeout(() => {
      this.loading = false;
    }, 250);
  }

  customItems(params) {
    return [];
  }

  openConfirmDialog(row: any) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent);
    modalRef.result.then((result) => {
      if (result == 'confirm') {
        this.removeCell(row);
      }
    });
  }

  getContextMenuItems(params) {
    const custom = params.context.thisComponent.customItems(params);

    var result = [
      {
        name: 'Delete',
        icon: '<span class="ag-icon  ag-icon-cancel text-danger"></span>',
        cssClasses: ['text-danger'],
        action: () => {
          params.context.thisComponent.openConfirmDialog(params.node.data);
        },
      },
      {
        name: 'Edit',
        icon: '<span class="ag-icon icon-fo-edit text-primary"></span>',
        cssClasses: ['text-info'],
        action: () => {
          params.context.thisComponent.editCell(params.node.data);
        },
      },
    ];
    return [
      ...result,
      ...custom,
      'copy',
      'copyWithHeaders',
      'export',
      'separator',
      'chartRange',
    ];
  }

  removeCell(row) {
    console.log('remove clicked !');
  }

  editCell(row) {
    console.log('edit clicked !');
  }

  loadMore(skip: number, top: number) {
    console.log('End Scroll!');
  }

  pushData(data) {
    if (this.top > data.length) {
      this.loadmoreFlag = false;
    }
    const index = this.gridApi.getDisplayedRowCount();
  }

  getDataPath: GetDataPath = function (data) {
    return data.orgHierarchy;
  };

  ToTree(data: any[], key?: string, parenyKey?: string, nameKey?: string) {
    function treePath(item, arr) {
      arr = [item[nameKey as any]].concat(arr);
      if (item[parenyKey as any]) {
        item = data.find((f) => f[key as any] === item[parenyKey as any]);
        return item ? treePath(item, arr) : arr;
      } else {
        return arr;
      }
    }

    data.forEach((f) => {
      f.orgHierarchy = treePath(f, []);
    });

    return data;
  }
  agGridUpdate() {
    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
      this.gridApi.redrawRows();
      this.gridApi.sizeColumnsToFit();
      this.countItemEdited = this.getCountEdited();
    }
  }
  getCountEdited() {
    return this.rowData.filter((f) => f.isEdited).length;
  }
  cellValueChanged(event) {
    if (event.newValue != event.oldValue) {
      let rowIndex = this.rowData.indexOf(event.data);
      this.rowData[rowIndex].isEdited = true;
      this.countItemEdited = this.getCountEdited();
    }
  }
  startEditing(row) {
    Object.keys(row).forEach((key, index) => {
      this.gridApi.startEditingCell({
        rowIndex: 0,
        colKey: key,
      });
    });
  }
  startEditingCol(key) {
    this.gridApi.startEditingCell({
      rowIndex: 0,
      colKey: key,
    });
  }
}
var UPDATE_COUNT = 20;

function copyObject(object: any) {
  // start with new object
  var newObject: any = {};
  // copy in the old values
  Object.keys(object).forEach((key) => {
    newObject[key] = object[key];
  });
  return newObject;
}
export enum TypeFilter {
  contains = '@=',
  notContains = '!@=',
  equals = '==',
  notEqual = '!=',
  startsWith = '_=',
  endsWith = '!_=',
}
export enum SortType {
  'asc' = '',
  'desc' = '-',
}

export const agGridLocaleText = {
  page: 'صفحه',
  more: 'مشاهده همه',
  to: 'به',
  of: 'از',
  next: 'بعدی',
  last: 'آخرین',
  first: 'اولین',
  previous: 'قبلی',
  loadingOoo: 'درحال‌بارگذاری...',

  selectAll: 'انتخاب همه',
  searchOoo: 'درحال‌جستجو...',
  blanks: 'خالی',

  filterOoo: 'متن فیلتر',
  applyFilter: 'تایید',
  equals: 'برابر با',
  notEqual: 'نا برابر با',

  lessThan: 'کمتر از ',
  greaterThan: 'مشاهده همه از',
  lessThanOrEqual: 'کمتر‌یا‌برابر با',
  greaterThanOrEqual: 'مشاهده همه‌یا‌برابر با',
  inRange: 'در محدوده',

  contains: 'شامل',
  notContains: 'مخالف با',
  startsWith: 'شروع با',
  endsWith: 'پایان با',

  group: 'گروه بندی',

  columns: 'ستـونها',
  rowGroupColumns: 'laPivot Cols',
  rowGroupColumnsEmptyMessage: 'la drag cols to group',
  valueColumns: 'مقدار ستونها',
  pivotMode: 'laPivot-Mode',
  groups: 'گروهها',
  values: 'مقادیر',
  pivots: 'ضربدری',
  valueColumnsEmptyMessage: 'خالی می باشد',
  pivotColumnsEmptyMessage: 'خالی می باشد',
  toolPanelButton: 'پنل ابزار',

  noRowsToShow: 'سطری موجود نیست',

  pinColumn: 'سنجاق ستون',
  valueAggregation: 'تجمع مقدار',
  autosizeThiscolumn: 'سایز خودکار ستون',
  autosizeAllColumns: 'سایز خودکار ستونها',
  groupBy: 'دسته‌بندی با',
  ungroupBy: 'عدم دسته‌بندی با',
  resetColumns: 'بازنشانی ستونها',
  expandAll: 'بازکردن همه',
  collapseAll: 'جمع‌کردن همه',
  toolPanel: 'جعبه ابزار',
  export: 'خروجی',
  csvExport: 'خروجی csv',
  excelExport: 'خروجی excel',

  pinLeft: 'سنجاق به چپ <<',
  pinRight: 'سنجاق به راست >>',
  noPin: 'عدم سنجاق <>',

  sum: 'جمع',
  min: 'کمترین',
  max: 'مشاهده همه',
  none: 'هیچ‌کدام',
  count: 'تعداد',
  average: 'میانگین',

  copy: 'کپی(Copy)',
  copyWithHeaders: 'کپی با تیترها ',
  ctrlC: 'ctrl+C',
  paste: 'چسباندن(Paste)',
  ctrlV: 'ctrl+V',
};
export function chartTooltipRenderer({ datum, xKey, yKey }: any) {
  return {
    content: `${formatDate(datum[xKey])}: ${datum[yKey]}`,
  };
}
export function formatDate(date: Date | number) {
  return Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: undefined,
  }).format(new Date(date));
}
export function numberCellFormatter_valueFormatter(
  params: ValueFormatterParams
) {
  return Math.floor(params.value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
export function number_valueParser(params: ValueParserParams) {
  return Number(params.newValue);
}
export function number_valueParser1(number: number) {
  return Math.floor(number).toLocaleString();
}
