import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AuthenticationBase,
  AuthenticationLogin,
  IExistenceUser,
  JwtToken,
  UserCreate,
  UserCreateAuth,
} from 'models';
import { ApiUrlService } from 'services';
import { MenuModel } from '../models';
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}
  getAllMenu(menu_category, sub_menu_category) {
    return this.$http.get<Array<MenuModel>>(
      `${this.urlSvc.menu.exam}/${menu_category}/${sub_menu_category}`
    );
  }
}
