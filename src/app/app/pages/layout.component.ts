import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { localStorageService } from '../../share/services/localStorage.service';
import { MobileCheckService } from '../services/is-mobile';
import { ManageTabBarService } from '@share/services/manage-tab-bar.service';
import { ITabBarModel } from '@share/models';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  title = 'ieltsdaily-db';
  isMobile: any;
  active: number = 0;
  key: string = 'menu';
  constructor(
    private service: MobileCheckService,
    private cd: ChangeDetectorRef,
    public manageTabBarService: ManageTabBarService,
    private localStorageService: localStorageService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.service.mobileCheck();
    this.manageTabBarService.indexSelected$.subscribe((index) => {
      this.active = index;
    });
  }
  setlocalStorageData() {
    this.localStorageService.setlocalStorage(
      this.key,
      this.manageTabBarService.listMenu
    );
  }
  close(event: MouseEvent, toRemove: number) {
    this.manageTabBarService.listMenu =
      this.manageTabBarService.listMenu.filter(
        (item) => item.index !== toRemove
      );
    if (this.manageTabBarService.listMenu.length > 0) {
      this.active =
        this.manageTabBarService.listMenu[
          this.manageTabBarService.listMenu.length - 1
        ].index;
    }

    this.setlocalStorageData();
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  outputs = {
    onSomething: (type: ITabBarModel) => {
      let find = this.manageTabBarService.listMenu.find(
        (f) => f.index == type.index && f.label == type.component
      );
      if (find && find.isAutoSave) {
        find.filter = Object.assign({}, type.filter);
        this.setlocalStorageData();
      }
    },
  };
  ngAfterViewInit(): void {
    this.localStorageService.getlocalStorage(this.key).then((res) => {
      if (res) {
        this.manageTabBarService.listMenu = res;
      }
    });
  }
}
