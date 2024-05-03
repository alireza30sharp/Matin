export interface companyInterFace {
  companyUniqCode?: any;
  CompanyName: any;
  cityId?: any;
  companyPassword?: any;
  companyTel?: any;
  companyAddress?: any;
  companyTypeId?: any;
  companyMobile: any;
  email: any;
}


export class companyModel {
  row_NO?: number;
  companyId: number;
  companyUniqCode: string;
  companyName: string;
  cityId: number;
  cityName?: string;
  companyTel: string;
  companyPassword?:string;
  companyAddress: string;
  companyMobile: string;
  statusId: number;
  companyTypeId: number;
  companyStatusName?: string;
  companyTypeName?: string;
  email: string;
}

export class companyInput {
  companyUniqCode: string = '';
  companyName: string = '';
  companyId: number = 0;
  cityId: number = 0;
  statusId: number = 0;
  companyTypeId: number = 0;
  PageNumber: number = 1;
  PageSize: number = 20;

}

export class updateCompanyPasswordDto{
companyUniqCode: string;
oldPassword: string;
newPassword: string;
  
}