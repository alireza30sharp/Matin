import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  toggle: boolean = false;

  toggleChange() {
    if (this.toggle) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
  bxMenuClick() {
    const sideBar = document.querySelector('.sidebar');
    sideBar.classList.toggle('close');
  }
}
