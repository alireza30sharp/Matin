export interface companyInterFace {
  companyUniqCode?: any;
  CompanyName: any;
  cityId?: any;
  companyPassword: any;
  companyTel?: any;
  companyAddress?: any;
  companyType?: any;
  companyMobile: any;
  email: any;
}

export interface companyModel {
  id: number;
  cityName: string;
  componyTel: string;
  componyAddress: string;
  companyMobile: any;
  statusId: number;
  companyType: number;
  companyStatuesName: string;
  companyTypeName: string;
  companyUniqCode: string;
  CompanyName: string;
  companyPassword: string;
  companyTel: string;
  email: string;
  cityId: number;
  componyUniqCode: string;
  componyName: string;
  companyAddress: string;
}

export class companyInput {
  CompanyUniqCode: string = '';
  CompanyName: string = '';
  Id: number = 0;
  CityId: number = 0;
  statuesId: number = 0;
  CompanyTypeId: number = 0;
  PageNumber: number = 1;
  PageSize: number = 20;
  SelectFrom: number = 0;
  SelectCount: number = 0;
}

export class companyInsert {
  companyId: number;
  id: number;
  companyUniqCode: string;
  companyName: string;
  cityId: number;
  companyPassword: string;
  companyTel: string;
  companyAddress: string;
  companyType: number;
  companyMobile: string;
  stauesId: number = 0;
  email: string;
}
