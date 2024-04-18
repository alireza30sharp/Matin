import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data, response } from '~/share/models/response.model';
import { ApiUrlService } from '~/api-url.service';
import { companyInput, companyInsert, companyModel } from '../models';
@Injectable()
export class CompanyService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  getCompanies(params?: companyInput) {
    return this.$http.get<response<Data<companyModel>>>(
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
}
