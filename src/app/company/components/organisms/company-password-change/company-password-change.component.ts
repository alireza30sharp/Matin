import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form } from '@angular/forms';
import { updateCompanyPasswordDto } from 'src/app/company/models';
@Component({
  selector: 'app-company-password-change',
  templateUrl: './company-password-change.component.html',
  styleUrls: ['./company-password-change.component.scss'],
})
export class CompanyPasswordChangeComponent implements OnInit {
  @Input() submitButtonId?: string = 'submit-button-password';
  @Output() submitCallback = new EventEmitter<updateCompanyPasswordDto>();
  model:updateCompanyPasswordDto=new updateCompanyPasswordDto();
  typePassword: boolean = true;
  constructor() {
  }

  ngOnInit(): void {
  }
  changeType() {
    this.typePassword = !this.typePassword;
  }
  submitHandler(companyForm: any) {
    this.submitCallback.emit(this.model);
  }
}
