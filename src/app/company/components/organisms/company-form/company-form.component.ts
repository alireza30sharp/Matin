import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor() {}
  update() {}
  ngOnInit(): void {}
  submitHandler() {
    this.submitCallback.emit(this.companyModel);
  }
}
