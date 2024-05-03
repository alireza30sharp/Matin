import { Component } from '@angular/core';
import { UserAuthService } from '@services';
import { idpEnum } from '@share/models/idp.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private _userAuthService:UserAuthService){

  }
  toggle: boolean = false;
  idpEnum=idpEnum;
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
