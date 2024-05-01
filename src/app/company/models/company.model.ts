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
export class companyInsert {
  companyId: number;
  companyUniqCode: string;
  companyName: string;
  cityId: number;
  companyPassword: string;
  companyTel: string;
  companyAddress: string;
  companyType: number;
  stauesId: number;
  companyMobile: string;
  email: string;
  id?: number;
}

export class companyModel {
  row_NO: number;
  companyId: number;
  companyUniqCode: string;
  companyName: string;
  cityId: number;
  cityName: string;
  companyTel: string;
  companyAddress: string;
  companyMobile: string;
  statusId: number;
  companyTypeId: number;
  companyStatuesName: string;
  companyTypeName: string;
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
