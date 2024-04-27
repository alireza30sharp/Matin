import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services';
import { VariablesReportInterFace } from '@share/interfaces/variables-report.interface';

@Component({
  selector: 'app-company-factor',
  templateUrl: './company-factor.component.html',
  styleUrls: ['./company-factor.component.scss'],
  providers: [CompanyService],
})
export class CompanyFactorComponent implements OnInit {
  eid: any;
  data;
  dataSetName: any = 'Data';
  message: string = '';
  variablesInReport: Array<VariablesReportInterFace> = [
    { paramName: 'NameCompony', paramValue: 'کیا سیستم' },
  ];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _companyService: CompanyService
  ) {}
  ngOnInit(): void {
    this.data = {
      Mande: {
        Mande: 300000,
        MandeGhabli: 560,
      },
      Ghabz_Masale: {
        Time_Fact: '20:30',
        Time_In: '12:40',
        Date_Fact: '1394/02/03',
        Empty_Scale: 10,
        Full_Scale: 180000,
        Pelak_Car: '459999 ایرن 12',
        Sh_Ghabz: 3434343434,
        Name_H: 'Name_H',
        Driver_Car: 'Driver_Car',
        StrVaziatMande: 'StrVaziatMande',
        Jam_Khales: 90888,
        Takhfif: 1200,
        Mab_Vahed: 2390.67,
        Net_Weight: 700,
        Name_Kala: 'Name_Kala',
      },
    };
    this._activatedRoute.params.subscribe((params) => {
      this.eid = params['eid'];
      this.getBarnameByLink();
    });
  }
  getBarnameByLink() {
    this._companyService.getBarnameByLink(this.eid).subscribe((res) => {
      debugger;
      if (res.isOk) {
      } else {
        this.message = res.messages.join(' ');
      }
    });
  }
}
