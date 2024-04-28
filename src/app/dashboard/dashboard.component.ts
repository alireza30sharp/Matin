import { Component, OnInit } from '@angular/core';
import { MobileCheckService } from '../services/is-mobile';
import { ModalService } from '@share/services/modal.service';
import { ReportListComponent } from '@share/components';
@Component({
  selector: 'app-dashboard-test',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isMobile: any;
  constructor(
    private service: MobileCheckService,
    private _modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.isMobile = this.service.mobileCheck();
  }
  openModal() {
    this._modalService
      .open(ReportListComponent, 'md')
      .then((value) => {})
      .catch((err) => {});
  }
}
