import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { FormService } from '@share/services';
@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.scss'],
})
export class FromComponent implements OnInit {
  AddUserForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private formService: FormService) {}
  ngOnInit(): void {
    this.AddUserForm = this.fb.group({
      full_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      teaching_type: new FormControl('', [Validators.required]),
      web_site_address: new FormControl(),
      department: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      mobile_number: [
        '',
        [Validators.required, Validators.pattern('([0-9]|[ ]|[-]|[+])*')],
      ],
      phone_number: [
        '',
        [Validators.required, Validators.pattern('([0-9]|[ ]|[-]|[+])*')],
      ],
      category: new FormControl(),
      text: new FormControl('', [Validators.required]),
      status: new FormControl(),
      letter_file_name: new FormControl(),
      cv_file_name: new FormControl(),
      state: new FormControl(),
      district: new FormControl(),
      educational_institution_fk_id: new FormControl(),
      notes: new FormControl(),
      answer: new FormControl(),
    });
  }

  get f(): any {
    return this.AddUserForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.AddUserForm.invalid) {
      return;
    }

    this.formService
      .fromJoin_form_datas(this.AddUserForm.value)
      .subscribe((res) => {
        console.table(res);
      });
  }

  onReset() {
    this.submitted = false;
    this.AddUserForm.reset();
  }
}
