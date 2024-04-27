import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  companyInput,
  companyInsert,
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
    return this.$http.get<response<Data<companyModel[]>>>(
      this.urlSvc.company.getCompanies,
      {
        params: {
          Id: params.Id,
          CityId: params.CityId,
          statuesId: params.statuesId,
          CompanyTypeId: params.CompanyTypeId,
          CompanyUniqCode: params.CompanyUniqCode,
          CompanyName: params.CompanyName,
          PageNumber: params.PageNumber,
          PageSize: params.PageSize,
          SelectFrom: params.SelectFrom,
          SelectCount: params.SelectCount,
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

  updateCompany(model: companyInsert) {
    return this.$http.put<response<string>>(
      this.urlSvc.company.updateCompany,
      model
    );
  }
  createCompany(model: companyInterFace) {
    return this.$http.post<response<any>>(
      this.urlSvc.company.addCompany,
      model
    );
  }
  getCompaniyById(Id: number) {
    return this.$http.get<response<any>>(this.urlSvc.company.getCompaniyById, {
      params: {
        Id: Id,
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
