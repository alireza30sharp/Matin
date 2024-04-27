import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form } from '@angular/forms';
import { SelectOptionInterface } from '@share/interfaces/select-option.interface';
import { companyInsert } from 'src/app/company/models';
import {
  cacheKeyEnum,
  clientPrerequisitsInterface,
} from 'src/app/company/models/clientPrerequisits';
import { ClientPrerequisitsService } from 'src/app/company/services/client-prerequisits';
@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit {
  @Input() submitButtonId?: string = 'submit-button';
  @Input() companyModel: companyInsert = new companyInsert();
  @Output() submitCallback = new EventEmitter<companyInsert>();
  listclientPrerequisits: clientPrerequisitsInterface[];
  cityOptions?: SelectOptionInterface<any>[];
  companyTypeOptions?: SelectOptionInterface<any>[];
  lockupsIsLoading: boolean = false;
  typePassword: boolean = true;
  cacheKeyType = cacheKeyEnum;

  constructor(private clientPrerequisitsService: ClientPrerequisitsService) {
    this.clientPrerequisitsService.getClientPrerequisits().subscribe((res) => {
      if (res.isOk) {
        this.listclientPrerequisits = res.data;
        this.cityOptions = this.listclientPrerequisits
          .find((f) => f.cacheKey == this.cacheKeyType.cities)
          .cacheData.map((item) => ({
            label: item.name,
            value: item.id,
          }));
        this.companyTypeOptions = this.listclientPrerequisits
          .find((f) => f.cacheKey == this.cacheKeyType.company_types)
          .cacheData.map((item) => ({
            label: item.desc,
            value: item.code,
          }));
      }
    });
  }
  update() {}
  ngOnInit(): void {}
  changeType() {
    this.typePassword = !this.typePassword;
  }
  submitHandler(companyForm: any) {
    this.submitCallback.emit(this.companyModel);
    this.companyModel = new companyInsert();
  }
}
