import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SizeType } from 'src/app/share/types/size.type';

@Component({
  selector: 'ki-textarea',
  templateUrl: './ki-textarea.component.html',
  styleUrls: ['./ki-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KiTextareaComponent),
      multi: true,
    },
  ],
})
export class KiTextareaComponent implements OnInit {
  @Input('value') _value = '';

  @Input() id?: string;
  @Input() placeholder: string;
  @Input() disable: boolean = false;
  @Input() readonly: boolean = false;
  @Input() size: SizeType;
  @Input() state?: 'error' | 'success';
  @Input() rows?: number;
  @Input() height?: string;

  constructor() {}

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
  }

  ngOnInit() {}

  public onChangeFn = (_: any) => {};

  public onTouchedFn = () => {};

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public writeValue(obj: any): void {
    this.value = obj;
  }

  public onChange() {
    this.onChangeFn(this.value);
  }
}
