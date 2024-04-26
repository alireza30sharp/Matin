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
  dataSetName: any = 'ReportGeneral';
  message: string = '';
  variablesInReport:Array<VariablesReportInterFace>=[
    {paramName:'unit',paramValue:'fiiii'},
    {paramName:'test',paramValue:'test test'}
  ]
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _companyService: CompanyService
  ) {}
  ngOnInit(): void {
    this.data = {
      GeneralData:
        {
          RiqName: 'RiqName',
          WellName: 'WellName',
          WellType:'WellType',
          ReportDate:'ReportDate',
          ReportNo:'ReportNo',
          HoleSection:'HoleSection',
          GLE:'GLE',
          RTE:'RTE',
          Geologist:'Geologist'
        },
        DrillingParameters:{
          PreviousDepth:'PreviousDepth',
          MidNightDepth:'MidNightDepth',
          DrilledTime:'DrilledTime',
          AveROP:'AveROP',
          MorningDepth:'MorningDepth',
          KOP:'KOP',
          WOB:'WOB',
          GPM:'GPM',
          BitSize:'BitSize'
        },
        MudProperties:{
          MudType:'MudType',
          MudWeight:'MudWeight',
          Viscosity:'Viscosity',
          PV:'PV',
          YP:'YP',
          PH:'PH',
          MudLostDownHole:'MudLostDownHole',
          MudLostatSurface:'MudLostatSurface',
          Gain:'Gain'
        },
        FormationProperties:{
          FormationMember:'FormationMember',
          FormationTop:'FormationTop',
          DominateLithology:'DominateLithology',
          NextFormation:'NextFormation',
          NextFmTop:'NextFmTop',
          LastCSGSize:'LastCSGSize',
          LastCSGShoe:'LastCSGShoe',
          NextCSGSize:'NextCSGSize',
          NextCSGShoe:'NextCSGShoe'
        },
        Description:[
          {Desc:'asassas fjasf sdfasdf',To:1233,From:90},
          {Desc:'asassas fjasf sdfasdf',To:1233,From:90},
          {Desc:'asassas fjasf sdfasdf',To:1233,From:90},
        ],
        SummaryofOperation:[
          {Desc:'wewee ewe e '},
          {Desc:'assdsdd ewe e '},
          {Desc:'oioioiio ewe e '},
          {Desc:'terdfcgv ewe e '},

        ],
        HazardRemarks:[
          {Desc:'HazardRemarks ewe e '},
          {Desc:'HazardRemarks ewe e '},
          {Desc:'oioioiio ewe e '},
          {Desc:'terdfcgv ewe e '},

        ],
        SurveyData:[
          {MD:232,Incl:98,Azimuth:56,TVD:544,North:345,East:987,VS:34,DLS:78,Formation:'rrr',Tool:76,FormationMember:54,TopSubSea:87,Lithology:54,TopMD:54}
        ]

      // Ghabz_Masale: [
      //   {
      //     Time_Fact: '20:30',
      //     Time_In: '12:40',
      //     Date_Fact: '1394/02/03',
      //     Empty_Scale: 10,
      //     Full_Scale: 180000,
      //     Pelak_Car: '459999 ایرن 12',
      //     Sh_Ghabz: 3434343434,
      //     Name_H: 'Name_H',
      //     Driver_Car: 'Driver_Car',
      //     StrVaziatMande: 'StrVaziatMande',
      //     Jam_Khales: 90888,
      //     Takhfif: 1200,
      //     Mab_Vahed: 2390.67,
      //     Net_Weight: 700,
      //     Name_Kala: 'Name_Kala',
      //   },

      //   {
      //     Time_Fact: '10:30',
      //     Time_In: '12:40',
      //     Date_Fact: '1394/02/03',
      //     Empty_Scale: 10,
      //     Full_Scale: 4567,
      //     Pelak_Car: '459999 ایرن 12',
      //     Sh_Ghabz: 457,
      //     Name_H: 'Name_H',
      //     Driver_Car: 'Driver_Car',
      //     StrVaziatMande: 'StrVaziatMande',
      //     Jam_Khales: 567567,
      //     Takhfif: 345,
      //     Mab_Vahed: 345.67,
      //     Net_Weight: 34,
      //     Name_Kala: 'Name_Kala',
      //   },
      // ],
    };
    this._activatedRoute.params.subscribe((params) => {
      this.eid = params['eid'];
      this.getBarname();
    });
  }
  getBarname() {
    this._companyService.getBarname(this.eid).subscribe((res) => {
      if (res.isOk) {
      } else {
        this.message = res.messages.join(' ');
      }
    });
  }
}
