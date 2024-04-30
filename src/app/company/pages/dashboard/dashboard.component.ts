import { Component } from '@angular/core';
import { ReportListComponent } from '@share/components';
import { ModalService } from '@share/services/modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private _modalService: ModalService) {}

  openModal() {
    this._modalService
      .open(ReportListComponent, 'lg')
      .then((value) => {})
      .catch((err) => {});
  }
}
