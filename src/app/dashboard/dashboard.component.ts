import { Component, OnInit } from '@angular/core';
import { MobileCheckService } from '~/services/is-mobile';
@Component({
  selector: 'app-dashboard-test',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isMobile: any;
  constructor(private service: MobileCheckService) {}
  ngOnInit(): void {
    this.isMobile = this.service.mobileCheck();
  }
}
