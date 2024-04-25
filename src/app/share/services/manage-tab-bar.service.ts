import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { ITabBarModel, type_menu_label } from '../models/tab-bar.model';
import { Nodes } from '../models/node';
import { CompanyListComponent } from 'src/app/company/pages/company-list/company-list.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
@Injectable({
  providedIn: 'root',
})
export class ManageTabBarService {
  constructor() {}
  listMenu = new Array<ITabBarModel>();
  type_menu_label = type_menu_label;
  indexSelected$ = new Subject<number>();
  genarateComponent(
    menuItem: Nodes,
    isAddToTab: boolean = true
  ): Observable<number> {
    return new Observable((observer: Observer<number>) => {
      if (!isAddToTab) {
        let find = this.listMenu.find((f) => f.label == menuItem.component);
        if (find) {
          this.indexSelected$.next(find.index);
          observer.next(find.index);
          observer.complete();
        } else {
          switch (menuItem.component) {
            case type_menu_label.company:
              this.listMenu = this.listMenu.concat({
                name: menuItem.name,
                label: menuItem.component,
                component: CompanyListComponent,
              });
              break;
            case type_menu_label.report:
              this.listMenu = this.listMenu.concat({
                name: menuItem.name,
                label: menuItem.component,
                component: 'ReportComponent',
              });

              break;
            case type_menu_label.dashboard:
              this.listMenu = this.listMenu.concat({
                name: menuItem.name,
                label: menuItem.component,
                component: DashboardComponent,
              });

              break;
          }
          this.listMenu = this.listMenu.map((f, i) => {
            f.index = i;
            return f;
          });
          let findAdd = this.listMenu.find((f) => f.label == menuItem.name);
          observer.next(findAdd.index);
          observer.complete();
        }
      } else {
        switch (menuItem.component) {
          case type_menu_label.company:
            this.listMenu = this.listMenu.concat({
              name: menuItem.name,
              label: menuItem.component,
              component: CompanyListComponent,
            });
            break;
          case type_menu_label.report:
            this.listMenu = this.listMenu.concat({
              name: menuItem.name,
              label: menuItem.component,
              component: 'ReportComponent',
            });
            break;
          case type_menu_label.dashboard:
            this.listMenu = this.listMenu.concat({
              name: menuItem.name,
              label: menuItem.component,
              component: DashboardComponent,
            });

            break;
        }
        this.listMenu = this.listMenu.map((f, i) => {
          f.index = i;
          return f;
        });
        observer.next(-1);
        observer.complete();
      }
    });
  }
  setIndexList() {
    this.listMenu = this.listMenu.map((f, i) => {
      f.index = i;
      return f;
    });
  }
}
