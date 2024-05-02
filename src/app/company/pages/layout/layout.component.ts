import { Component } from '@angular/core';
import { UserAuthService } from '@services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private _userAuthService:UserAuthService){

  }
  toggle: boolean = false;
  logout(){
this._userAuthService.signing()
  }
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
