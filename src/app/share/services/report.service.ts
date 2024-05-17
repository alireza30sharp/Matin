import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiUrlService } from '@services';
import { Data, response } from '@share/models/response.model';
@Injectable()
export class ReportService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  GetReports(DicId: number, CompanyId: number) {
    return this.$http.get<response<any>>(this.urlSvc.report.GetReports, {
      params: {
        DicId: DicId,
        CompanyId: CompanyId,
      },
    });
  }
}
