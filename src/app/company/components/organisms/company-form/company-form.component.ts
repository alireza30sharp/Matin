import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectOptionInterface } from '@share/interfaces/select-option.interface';
import { companyInsert } from 'src/app/company/models';
@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit {
  @Input() submitButtonId?: string = 'submit-button';
  @Input() companyModel: companyInsert = new companyInsert();
  @Output() submitCallback = new EventEmitter<companyInsert>();
  cityOptions?: SelectOptionInterface<any>[];
  lockupsIsLoading: boolean = false;
  typePassword: boolean = true;
  city = [
    { label: 'آبادان', value: '1' },
    { label: 'آباده', value: '2' },
    { label: 'آباده طشک', value: '3' },
  ];
  constructor() {
    this.cityOptions = this.city.map((item) => ({
      label: item.label,
      value: item.value,
    }));
  }
  update() {}
  ngOnInit(): void {}
  changeType() {
    this.typePassword = !this.typePassword;
  }
  submitHandler() {
    this.submitCallback.emit(this.companyModel);
  }
}
