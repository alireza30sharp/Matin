import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl + '/api/';
const BASE_URL_v1 = BASE_URL + '/api/v1/';
@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {
  constructor() {}

  auth = {
    signup: BASE_URL + 'auth/signup',
    signing: BASE_URL + 'auth/signin',
    mobileAuth: BASE_URL + 'Auth/MobileAuth',
    emailAuth: BASE_URL + 'Auth/EmailAuth',
    emailSignIn: BASE_URL + 'Auth/EmailSignIn',
    verifyOtp: BASE_URL + 'auth/verifyotp',
    verifyAccount: BASE_URL + 'auth/verifyaccount',
  };
  activationAndVerificationCode = {
    resendCode: BASE_URL + 'ActivationAndVerificationCode/ResendCode',
    checkAuthCodeAndLogin:
      BASE_URL + 'ActivationAndVerificationCode/checkAuthCodeAndLogin',
  };
  user = {
    check: BASE_URL + 'user/check',
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
    getCompanies: BASE_URL + 'Company/GetCompanies',
    preRegisterCompany: BASE_URL + 'Company/PreRegisterCompany',
    deleteCompany: BASE_URL + 'Company/DeleteCompany',
    updateCompany: BASE_URL + 'Company/updateCompany',
    addCompany: BASE_URL + 'Company/AddCompany',
    getCompaniyById: BASE_URL + 'Company/GetCompaniyById',
  };
  barname = {
    GetBarname: BASE_URL + 'Barname/GetBarname',
    GetBarnameByLink: BASE_URL + 'Barname/GetBarnameByLink',
  };
  clientPrerequisits = {
    GetClientPrerequisits:
      BASE_URL + 'ClientPrerequisits/GetClientPrerequisits',
  };
}
