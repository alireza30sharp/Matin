import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITabBarModel, type_menu_label } from '../models/tab-bar.model';
import { CompanyListComponent } from 'src/app/company/pages/company-list/company-list.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
@Injectable({
  providedIn: 'root',
})
export class localStorageService {
  type_menu_label = type_menu_label;
  listMenu = new Array<ITabBarModel>();
  constructor() {}
  async setlocalStorage(key, data: Array<ITabBarModel>) {
    await localStorage.setItem(key, JSON.stringify(data));
  }

  async getlocalStorage(key: string): Promise<Array<ITabBarModel>> {
    const ret = (await localStorage.getItem(key)) as any;
    let model = JSON.parse(ret as any);
    if (model) {
      model.map((f, i) => {
        switch (f.label) {
          case type_menu_label.company:
            f.component = CompanyListComponent;
            break;
          case type_menu_label.report:
            f.component = 'ReportComponent';
            break;
          case type_menu_label.dashboard:
            f.component = DashboardComponent;
            break;
          // case type_menu_label.report:
          //   f.component = ReportComponent;
          //   break;
        }
        return f;
      });
      return model;
    } else {
      return null;
    }
  }

  clear() {
    localStorage.clear();
  }
}
