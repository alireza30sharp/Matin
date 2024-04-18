import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, interval, of, Subject } from 'rxjs';

import {
  AuthenticationBase,
  AuthenticationLogin,
  IExistenceUser,
  JwtToken,
  UserCreate,
  UserCreateAuth,
} from 'models';
import { ApiUrlService, UserAuthService } from 'services';
import { fromModel } from '../models/from.model';
@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  fromJoin_form_datas(model: fromModel) {
    return this.$http.put(`${this.urlSvc.from.join_form_datas}`, model);
  }
}
