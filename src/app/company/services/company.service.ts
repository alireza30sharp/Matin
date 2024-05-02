import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  companyInput,
  companyInterFace,
  companyModel,
} from '../models';
import { ApiUrlService } from '@services';
import { Data, response } from '@share/models/response.model';
@Injectable()
export class CompanyService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  getCompanies(params?: companyInput) {
 let   PageNumber: number = 1;
 let  PageSize: number = 20;
    return this.$http.get<response<Data<companyModel[]>>>(
      this.urlSvc.company.getCompanies,
      {
        params: {
          CompanyId: params.companyId,
          CityId: params.cityId,
          statusId: params.statusId,
          CompanyTypeId: params.companyTypeId,
          CompanyUniqCode: params.companyUniqCode,
          CompanyName: params.companyName,
          PageNumber: PageNumber,
          PageSize:PageSize,
        },
      }
    );
  }

  deleteCompany(companyId?: any) {
    return this.$http.delete<response<string>>(
      this.urlSvc.company.deleteCompany,
      { body: { companyId: companyId } }
    );
  }

  updateCompany(model: companyModel) {
    return this.$http.put<response<string>>(
      this.urlSvc.company.updateCompany,
      model
    );
  }
  createCompany(model: companyModel) {
    return this.$http.post<response<any>>(
      this.urlSvc.company.addCompany,
      model
    );
  }
  getCompaniyById(Id: number) {
    return this.$http.get<response<any>>(this.urlSvc.company.getCompaniyById, {
      params: {
        CompanyId: Id,
      },
    });
  }
  preRegisterCompany(model: companyInterFace) {
    return this.$http.post<response<any>>(
      this.urlSvc.company.preRegisterCompany,
      model
    );
  }
  getBarname(eid: any) {
    return this.$http.get<response<any>>(this.urlSvc.barname.GetBarname, {
      params: {
        Id: eid,
      },
    });
  }
  getBarnameByLink(eid: any) {
    return this.$http.get<response<any>>(this.urlSvc.barname.GetBarnameByLink, {
      params: {
        Id: eid,
      },
    });
  }
}
