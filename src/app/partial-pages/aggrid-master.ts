import { GridOptions, GridApi, ColDef, GetDataPath } from 'ag-grid-community';
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../partial-pages/confirmation-dialog/confirmation-dialog';
export class AgGridMaster {
  modalRef: NgbModal;
  loading = false;
  data = [];

  top = 50;
  skip = 0;
  gridApi: GridApi;
  paginationPageSize = 20;
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
    sideBar: true,
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
        name: 'حذف',
        icon: '<span class="ag-icon  ag-icon-cancel text-danger"></span>',
        cssClasses: ['text-danger'],
        action: () => {
          params.context.thisComponent.openConfirmDialog(params.node.data);
        },
      },
      {
        name: 'ویرایش',
        icon: '<span class="ag-icon icon-fo-edit text-primary"></span>',
        cssClasses: ['text-info'],
        action: () => {
          params.context.thisComponent.editCell(params.node.data);
        },
      },
    ];
    return [...result, ...custom, 'copy', 'copyWithHeaders', 'export'];
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
  rowGroupColumnsEmptyMessage: 'ستون ها رو به این قسمت بکشید تا گروهبندی شود',
  valueColumns: 'مقدار ستونها',
  pivotMode: 'محور-حالت',
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
  // Set Filter
  selectAllSearchResults: '(Select All Search Results)',
  addCurrentSelectionToFilter: 'Add current selection to filter',
  noMatches: 'No matches',

  // Number Filter & Text Filter
  blank: 'Blank',
  notBlank: 'Not blank',
  empty: 'Choose one',

  // Number Filter
  inRangeStart: 'From',
  inRangeEnd: 'To',

  // Text Filter

  // Date Filter
  dateFormatOoo: 'yyyy-mm-dd',
  before: 'Before',
  after: 'After',

  // Filter Conditions
  andCondition: 'AND',
  orCondition: 'OR',

  // Filter Buttons
  resetFilter: 'بازنشانی کنید',
  clearFilter: 'پاک کردن',
  cancelFilter: 'لغو کنید',

  // Filter Titles
  textFilter: 'فیلتر متن',
  numberFilter: 'Number Filter',
  dateFilter: 'Date Filter',
  setFilter: 'Set Filter',

  // Group Column Filter
  groupFilterSelect: 'Select field:',

  // Advanced Filter
  advancedFilterContains: 'شامل',
  advancedFilterNotContains: 'شامل نمی شود',
  advancedFilterTextEquals: 'برابر است',
  advancedFilterTextNotEqual: 'برابر نیست',
  advancedFilterStartsWith: 'شروع با',
  advancedFilterEndsWith: 'به پایان می رسد با',
  advancedFilterBlank: 'خالی است',
  advancedFilterNotBlank: 'خالی نیست',
  advancedFilterEquals: '=',
  advancedFilterNotEqual: '!=',
  advancedFilterGreaterThan: '>',
  advancedFilterGreaterThanOrEqual: '>=',
  advancedFilterLessThan: '<',
  advancedFilterLessThanOrEqual: '<=',
  advancedFilterTrue: 'is true',
  advancedFilterFalse: 'is false',
  advancedFilterAnd: 'AND',
  advancedFilterOr: 'OR',
  advancedFilterApply: 'Apply',
  advancedFilterBuilder: 'Builder',
  advancedFilterValidationMissingColumn: 'Column is missing',
  advancedFilterValidationMissingOption: 'Option is missing',
  advancedFilterValidationMissingValue: 'Value is missing',
  advancedFilterValidationInvalidColumn: 'Column not found',
  advancedFilterValidationInvalidOption: 'Option not found',
  advancedFilterValidationMissingQuote: 'Value is missing an end quote',
  advancedFilterValidationNotANumber: 'Value is not a number',
  advancedFilterValidationInvalidDate: 'Value is not a valid date',
  advancedFilterValidationMissingCondition: 'Condition is missing',
  advancedFilterValidationJoinOperatorMismatch:
    'Join operators within a condition must be the same',
  advancedFilterValidationInvalidJoinOperator: 'Join operator not found',
  advancedFilterValidationMissingEndBracket: 'Missing end bracket',
  advancedFilterValidationExtraEndBracket: 'Too many end brackets',
  advancedFilterValidationMessage:
    'Expression has an error. ${variable} - ${variable}.',
  advancedFilterValidationMessageAtEnd:
    'Expression has an error. ${variable} at end of expression.',
  advancedFilterBuilderTitle: 'Advanced Filter',
  advancedFilterBuilderApply: 'Apply',
  advancedFilterBuilderCancel: 'Cancel',
  advancedFilterBuilderAddButtonTooltip: 'Add Filter or Group',
  advancedFilterBuilderRemoveButtonTooltip: 'Remove',
  advancedFilterBuilderMoveUpButtonTooltip: 'Move Up',
  advancedFilterBuilderMoveDownButtonTooltip: 'Move Down',
  advancedFilterBuilderAddJoin: 'Add Group',
  advancedFilterBuilderAddCondition: 'Add Filter',
  advancedFilterBuilderSelectColumn: 'Select a column',
  advancedFilterBuilderSelectOption: 'Select an option',
  advancedFilterBuilderEnterValue: 'Enter a value...',
  advancedFilterBuilderValidationAlreadyApplied:
    'Current filter already applied.',
  advancedFilterBuilderValidationIncomplete: 'Not all conditions are complete.',
  advancedFilterBuilderValidationSelectColumn: 'Must select a column.',
  advancedFilterBuilderValidationSelectOption: 'Must select an option.',
  advancedFilterBuilderValidationEnterValue: 'Must enter a value.',

  // Side Bar
  filters: 'فیلترها',

  // Row Drag
  rowDragRow: 'row',
  rowDragRows: 'rows',

  // Other

  loadingError: 'ERR',
  enabled: 'Enabled',

  // Menu
  ungroupAll: 'Un-Group All',
  addToValues: 'Add ${variable} to values',
  removeFromValues: 'Remove ${variable} from values',
  addToLabels: 'Add ${variable} to labels',
  removeFromLabels: 'Remove ${variable} from labels',

  copyWithGroupHeaders: 'Copy with Group Headers',
  cut: 'Cut',

  // Enterprise Menu Aggregation and Status Bar

  avg: 'میانگین',
  filteredRows: 'فیلتر شده',
  selectedRows: 'انتخاب شد',
  totalRows: 'مجموع ردیف ها',
  totalAndFilteredRows: 'ردیف ها',

  pageLastRowUnknown: '?',
  nextPage: 'صفحه بعد',
  lastPage: 'آخرین صفحه',
  firstPage: 'صفحه اول',
  previousPage: 'صفحه قبلی',
  pageSizeSelectorLabel: 'اندازه صفحه:',

  // Pivoting
  pivotColumnGroupTotals: 'جمع',

  // Enterprise Menu (Charts)
  pivotChartAndPivotMode: 'Pivot Chart & Pivot Mode',
  pivotChart: 'Pivot Chart',
  chartRange: 'Chart Range',

  columnChart: 'Column',
  groupedColumn: 'Grouped',
  stackedColumn: 'Stacked',
  normalizedColumn: '100% Stacked',

  barChart: 'Bar',
  groupedBar: 'Grouped',
  stackedBar: 'Stacked',
  normalizedBar: '100% Stacked',

  pieChart: 'Pie',
  pie: 'Pie',
  doughnut: 'Doughnut',

  line: 'Line',

  xyChart: 'X Y (Scatter)',
  scatter: 'Scatter',
  bubble: 'Bubble',

  areaChart: 'Area',
  area: 'Area',
  stackedArea: 'Stacked',
  normalizedArea: '100% Stacked',

  histogramChart: 'Histogram',
  histogramFrequency: 'Frequency',

  combinationChart: 'Combination',
  columnLineCombo: 'Column & Line',
  AreaColumnCombo: 'Area & Column',

  // Charts
  pivotChartTitle: 'Pivot Chart',
  rangeChartTitle: 'Range Chart',
  settings: 'Settings',
  data: 'داده ها',
  format: 'Format',
  categories: 'Categories',
  defaultCategory: '(None)',
  series: 'Series',
  xyValues: 'X Y Values',
  paired: 'Paired Mode',
  axis: 'Axis',
  navigator: 'Navigator',
  color: 'Color',
  thickness: 'Thickness',
  xType: 'X Type',
  automatic: 'Automatic',
  category: 'Category',
  number: 'Number',
  time: 'Time',
  autoRotate: 'Auto Rotate',
  xRotation: 'X Rotation',
  yRotation: 'Y Rotation',
  ticks: 'Ticks',
  width: 'Width',
  height: 'Height',
  length: 'Length',
  padding: 'Padding',
  spacing: 'Spacing',
  chart: 'Chart',
  title: 'Title',
  titlePlaceholder: 'Chart title - double click to edit',
  background: 'Background',
  font: 'Font',
  top: 'Top',
  right: 'Right',
  bottom: 'Bottom',
  left: 'Left',
  labels: 'Labels',
  size: 'Size',
  minSize: 'Minimum Size',
  maxSize: 'Maximum Size',
  legend: 'Legend',
  position: 'Position',
  markerSize: 'Marker Size',
  markerStroke: 'Marker Stroke',
  markerPadding: 'Marker Padding',
  itemSpacing: 'Item Spacing',
  itemPaddingX: 'Item Padding X',
  itemPaddingY: 'Item Padding Y',
  layoutHorizontalSpacing: 'Horizontal Spacing',
  layoutVerticalSpacing: 'Vertical Spacing',
  strokeWidth: 'Stroke Width',
  lineDash: 'Line Dash',
  offset: 'Offset',
  offsets: 'Offsets',
  tooltips: 'Tooltips',
  callout: 'Callout',
  markers: 'Markers',
  shadow: 'Shadow',
  blur: 'Blur',
  xOffset: 'X Offset',
  yOffset: 'Y Offset',
  lineWidth: 'Line Width',
  normal: 'Normal',
  bold: 'Bold',
  italic: 'Italic',
  boldItalic: 'Bold Italic',
  predefined: 'Predefined',
  fillOpacity: 'Fill Opacity',
  strokeOpacity: 'Line Opacity',
  histogramBinCount: 'Bin count',
  columnGroup: 'ستون',
  barGroup: 'Bar',
  pieGroup: 'Pie',
  lineGroup: 'Line',
  scatterGroup: 'X Y (Scatter)',
  areaGroup: 'Area',
  histogramGroup: 'Histogram',
  combinationGroup: 'Combination',
  groupedColumnTooltip: 'Grouped',
  stackedColumnTooltip: 'Stacked',
  normalizedColumnTooltip: '100% Stacked',
  groupedBarTooltip: 'Grouped',
  stackedBarTooltip: 'Stacked',
  normalizedBarTooltip: '100% Stacked',
  pieTooltip: 'Pie',
  doughnutTooltip: 'Doughnut',
  lineTooltip: 'Line',
  groupedAreaTooltip: 'Area',
  stackedAreaTooltip: 'Stacked',
  normalizedAreaTooltip: '100% Stacked',
  scatterTooltip: 'Scatter',
  bubbleTooltip: 'Bubble',
  histogramTooltip: 'Histogram',
  columnLineComboTooltip: 'Column & Line',
  areaColumnComboTooltip: 'Area & Column',
  customComboTooltip: 'Custom Combination',
  noDataToChart: 'No data available to be charted.',
  pivotChartRequiresPivotMode: 'Pivot Chart requires Pivot Mode enabled.',
  chartSettingsToolbarTooltip: 'Menu',
  chartLinkToolbarTooltip: 'Linked to Grid',
  chartUnlinkToolbarTooltip: 'Unlinked from Grid',
  chartDownloadToolbarTooltip: 'دانلود نمودار',
  seriesChartType: 'Series Chart Type',
  seriesType: 'Series Type',
  secondaryAxis: 'Secondary Axis',

  // ARIA
  ariaAdvancedFilterBuilderItem:
    '${variable}. Level ${variable}. Press ENTER to edit.',
  ariaAdvancedFilterBuilderItemValidation:
    '${variable}. Level ${variable}. ${variable} Press ENTER to edit.',
  ariaAdvancedFilterBuilderList: 'Advanced Filter Builder List',
  ariaAdvancedFilterBuilderFilterItem: 'Filter Condition',
  ariaAdvancedFilterBuilderGroupItem: 'Filter Group',
  ariaAdvancedFilterBuilderColumn: 'Column',
  ariaAdvancedFilterBuilderOption: 'Option',
  ariaAdvancedFilterBuilderValueP: 'Value',
  ariaAdvancedFilterBuilderJoinOperator: 'Join Operator',
  ariaAdvancedFilterInput: 'Advanced Filter Input',
  ariaChecked: 'checked',
  ariaColumn: 'Column',
  ariaColumnGroup: 'Column Group',
  ariaColumnFiltered: 'Column Filtered',
  ariaColumnSelectAll: 'Toggle Select All Columns',
  ariaDateFilterInput: 'Date Filter Input',
  ariaDefaultListName: 'List',
  ariaFilterColumnsInput: 'Filter Columns Input',
  ariaFilterFromValue: 'Filter from value',
  ariaFilterInput: 'Filter Input',
  ariaFilterList: 'Filter List',
  ariaFilterToValue: 'به مقدار فیلتر کنید',
  ariaFilterValue: 'Filter Value',
  ariaFilterMenuOpen: 'Open Filter Menu',
  ariaFilteringOperator: 'Filtering Operator',
  ariaHidden: 'پنهان شده است',
  ariaIndeterminate: 'indeterminate',
  ariaInputEditor: 'Input Editor',
  ariaMenuColumn: 'Press CTRL ENTER to open column menu.',
  ariaRowDeselect: 'Press SPACE to deselect this row',
  ariaRowSelectAll: 'Press Space to toggle all rows selection',
  ariaRowToggleSelection: 'Press Space to toggle row selection',
  ariaRowSelect: 'Press SPACE to select this row',
  ariaSearch: 'جستجو کردن',
  ariaSortableColumn: 'Press ENTER to sort',
  ariaToggleVisibility: 'Press SPACE to toggle visibility',
  ariaToggleCellValue: 'Press SPACE to toggle cell value',
  ariaUnchecked: 'بدون علامت',
  ariaVisible: 'visible',
  ariaSearchFilterValues: 'جستجوی مقادیر فیلتر',
  ariaPageSizeSelectorLabel: 'اندازه صفحه',

  // ARIA Labels for Drop Zones
  ariaRowGroupDropZonePanelLabel: 'Row Groups',
  ariaValuesDropZonePanelLabel: 'Values',
  ariaPivotDropZonePanelLabel: 'Column Labels',
  ariaDropZoneColumnComponentDescription: 'Press DELETE to remove',
  ariaDropZoneColumnValueItemDescription:
    'Press ENTER to change the aggregation type',
  ariaDropZoneColumnGroupItemDescription:
    'برای مرتب سازی کلید اینتر را فشار دهید',
  // used for aggregate drop zone, format: {aggregation}{ariaDropZoneColumnComponentAggFuncSeparator}{column name}
  ariaDropZoneColumnComponentAggFuncSeparator: ' of ',
  ariaDropZoneColumnComponentSortAscending: 'ascending',
  ariaDropZoneColumnComponentSortDescending: 'descending',

  // ARIA Labels for Dialogs
  ariaLabelColumnMenu: 'Column Menu',
  ariaLabelCellEditor: 'ویرایش سلول',
  ariaLabelDialog: 'Dialog',
  ariaLabelSelectField: 'انتخاب فیلد',
  ariaLabelRichSelectField: 'Rich Select Field',
  ariaLabelTooltip: 'Tooltip',
  ariaLabelContextMenu: 'Context Menu',
  ariaLabelSubMenu: 'SubMenu',
  ariaLabelAggregationFunction: 'Aggregation Function',
  ariaLabelAdvancedFilterAutocomplete: 'Advanced Filter Autocomplete',
  ariaLabelAdvancedFilterBuilderAddField: 'Advanced Filter Builder Add Field',
  ariaLabelAdvancedFilterBuilderColumnSelectField:
    'Advanced Filter Builder Column Select Field',
  ariaLabelAdvancedFilterBuilderOptionSelectField:
    'Advanced Filter Builder Option Select Field',
  ariaLabelAdvancedFilterBuilderJoinSelectField:
    'Advanced Filter Builder Join Operator Select Field',

  // ARIA Labels for the Side Bar
  ariaColumnPanelList: 'لیست ستون ها',
  ariaFilterPanelList: 'لیست فیلتر ها',

  // Number Format (Status Bar, Pagination Panel)
  thousandSeparator: ',',
  decimalSeparator: '.',

  // Data types
  true: 'True',
  false: 'False',
  invalidDate: 'تاریخ معتبر نیست',
  invalidNumber: 'عدد معتبر نیست',
  january: 'January',
  february: 'February',
  march: 'March',
  april: 'April',
  may: 'May',
  june: 'June',
  july: 'July',
  august: 'August',
  september: 'September',
  october: 'October',
  november: 'November',
  december: 'December',
};
