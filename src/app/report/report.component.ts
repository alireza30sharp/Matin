import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Router } from '@angular/router';
declare var Stimulsoft: any;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
constructor(){
  Stimulsoft.Base.StiLicense.Key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHkgpgFGkUl79uxVs8X+uspx6K+tqdtOB5G1S6PFPRrlVNvMUiSiNYl724EZbrUAWwAYHlGLRbvxMviMExTh2l9xZJ2xc4K1z3ZVudRpQpuDdFq+fe0wKXSKlB6okl0hUd2ikQHfyzsAN8fJltqvGRa5LI8BFkA/f7tffwK6jzW5xYYhHxQpU3hy4fmKo/BSg6yKAoUq3yMZTG6tWeKnWcI6ftCDxEHd30EjMISNn1LCdLN0/4YmedTjM7x+0dMiI2Qif/yI+y8gmdbostOE8S2ZjrpKsgxVv2AAZPdzHEkzYSzx81RHDzZBhKRZc5mwWAmXsWBFRQol9PdSQ8BZYLqvJ4Jzrcrext+t1ZD7HE1RZPLPAqErO9eo+7Zn9Cvu5O73+b9dxhE2sRyAv9Tl1lV2WqMezWRsO55Q3LntawkPq0HvBkd9f8uVuq9zk7VKegetCDLb0wszBAs1mjWzN+ACVHiPVKIk94/QlCkj31dWCg8YTrT5btsKcLibxog7pv1+2e4yocZKWsposmcJbgG0";
}


  ngOnInit(): void {
    // let data={
    //   "student" : [{
    //     "Name" : "1",
    //     "Id" : "One"
    //   }, {
    //     "Name" : "2",
    //     "Id" : "Two"
    //   }, {
    //     "Name" : "3",
    //     "Id" : "Three"
    //   }]
    // }
    //var jsonData = JSON.stringify(data);
   // var dataSet = new Stimulsoft.System.Data.DataSet("student");

  //var data=JSON.stringify(user);
    // dataSet.readJson(jsonData);
    //var report = new Stimulsoft.Report.StiReport();
    //report.regData(dataSet.dataSetName,dataSet.dataSetName,dataSet);
// Fill dictionary
// var dataSource = new Stimulsoft.Report.Dictionary.StiDataTableSource(data.student, data.student, data.student);
// dataSource.columns.add(new Stimulsoft.Report.Dictionary.StiDataColumn("Name", "Name", "Name"));
// dataSource.columns.add(new Stimulsoft.Report.Dictionary.StiDataColumn("Id", "Id", "Id"));
//report.dictionary.dataSources.add(dataSource);
 //report.loadFile("assets/reports/Order.mrt");
    //report.dictionary.databases.clear();
 var options = new Stimulsoft.Viewer.StiViewerOptions();
 options.toolbar.showDesignButton = true;

    var viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);
    //viewer.report = report;
    //viewer.renderHtml("viewerContent");
    //=====
    var report = new Stimulsoft.Report.StiReport();
		report.dictionary.databases.clear();
		var json = { "student": [ { Id: "a", Name: "A" } ] };
		var dataSet = new Stimulsoft.System.Data.DataSet("student");
		dataSet.readJson(json);
		report.regData("student", "student", dataSet);
    report.loadFile("assets/reports/Order.mrt");
		viewer.report = report;
    viewer.renderHtml("viewerContent");
  }

}


// var report = Stimulsoft.Report.StiReport.createNewReport();
// report.loadFile("assets/reports/Report.mrt");

// var options = new Stimulsoft.Designer.StiDesignerOptions();
// options.appearance.fullScreenMode = true;

// var designer = new Stimulsoft.Designer.StiDesigner(options, "StiDesigner", false);

// designer.onSaveReport = function (args) {
//   var report = args.report;
//   var str = report.saveToJsonString();
//   Stimulsoft.System.StiObject.saveAs(str, "Report.mrt", "application/json");
// }
// designer.report = report;
// designer.renderHtml("viewerContent");