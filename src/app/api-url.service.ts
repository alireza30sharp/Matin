import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl + '/';
const BASE_URL_v1 = BASE_URL + '/api/v1/';
@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {
  constructor() {}

  auth = {
    signup: BASE_URL_v1 + 'auth/signup',
    signing: BASE_URL_v1 + 'auth/signin',
    otp: BASE_URL_v1 + 'auth/otp',
    verifyOtp: BASE_URL_v1 + 'auth/verifyotp',
    verifyAccount: BASE_URL_v1 + 'auth/verifyaccount',
  };
  user = {
    check: BASE_URL_v1 + 'user/check',
  };
  course = {
    course: 'course/',
    me: BASE_URL + 'course/all/me',
    all: BASE_URL + 'course/all',
    type: BASE_URL + 'course/type',
  };

  exam = {
    exam: BASE_URL + '/exam/',
    me: BASE_URL + '/exam/all/me',
    all: BASE_URL + '/exam/all',
  };
  menu = {
    exam: BASE_URL_v1 + 'menu/allmenu/',
  };
  from = {
    join_form_datas: BASE_URL_v1 + 'join_form_datas',
  };

  company = {
    getCompanies: BASE_URL_v1 + 'Company/GetCompanies',
    deleteCompany: BASE_URL_v1 + 'Company/DeleteCompany',
    updateCompany: BASE_URL_v1 + 'Company/updateCompany',
  };
}
