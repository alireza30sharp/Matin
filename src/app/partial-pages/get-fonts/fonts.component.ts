import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as _healthSvc from '@health/services';
import * as _healthMls from '@health/models';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-fonts',
  templateUrl: './fonts.component.html',
  styleUrls: ['./fonts.component.scss'],
})
export class FontsComponent implements OnInit {

  title = 'httpclient-demo';
  fontsData = [];

  public userInfo: any;

  constructor(public http: HttpClient) {
    (window as any).method = this;
  }

  ngOnInit() {
    this.http.get('assets/icons/icons.json').subscribe((data: any[]) => {
      this.fontsData = this.fontsData.concat(data);
    });
  }
}
