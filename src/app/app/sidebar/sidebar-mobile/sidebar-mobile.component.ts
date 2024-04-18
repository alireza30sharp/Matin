import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar-mobile',
  templateUrl: './sidebar-mobile.component.html',
  styleUrls: ['./sidebar-mobile.component.scss']
})
export class SidebarMobileComponent implements OnInit {

  // isOpen = false;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openScrollableContent(longContent: any) {
    this.modalService.open(longContent, { scrollable: true });
  }

  /*menu() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen)
  }*/

}
