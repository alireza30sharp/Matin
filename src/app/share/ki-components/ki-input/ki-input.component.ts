import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { SizeType } from '../../types/size.type';
import ValidatorsHelper from '../../helpers/validators.helper';

@Component({
  selector: 'ki-input',
  templateUrl: './ki-input.component.html',
  styleUrls: ['./ki-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KiInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => KiInputComponent),
      multi: true,
    },
  ],
})
export class KiInputComponent implements ControlValueAccessor, OnChanges {
  @Input() _value = '';
  @Input() id?: string;
  @Input() placeholder: string;
  @Input() type:
    | 'password'
    | 'file'
    | 'number'
    | 'text'
    | 'emial'
    | 'phone'
    | 'fax' = 'text';
  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: string;
  @Input() size: SizeType;
  @Input() onlyNumber: boolean = false;
  @Input() disable: boolean = false;
  @Input() readonly: string;
  @Input() accept: string;
  @Input() state?: 'error' | 'success';
  @Input() startIconClassName?: string;
  @Input() endIconClassName?: string;
  @Input() template?: any;
  @Input() maskType?: 'separator' | 'percent' | (string & {});
  @Input() maskDecimalDigit?: number = 2;
  @Input() maskThousandSeparator?: string = ',';
  @Input() maskPrefix?: string = '';
  @Input() maskAllowNegativeNumbers?: boolean = true;
  @Input() sepLimitation: string = '999999999999999';
  @Output() onFileSelectedCallback: EventEmitter<File> = new EventEmitter();
  @Output() onEnterCallback: EventEmitter<string> = new EventEmitter();
  @Output() onChangeCallback: EventEmitter<any> = new EventEmitter();
  @Output() keydownCallback = new EventEmitter<KeyboardEvent>();
  @Output() focusCallback = new EventEmitter<Event>();

  @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement>;

  mask?: string;

  private _phonelengthMin = 1;
  private _phonelengthMax = 12;
  constructor() {}

  get value() {
    return this._value;
  }

  set value(val) {
    if (val !== this._value) {
      this._value = val;
      this.onChangeFn(val);
      this.onChangeCallback.emit(this.value);
    }
    this.onTouchedFn();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['maskType']) {
      this.mask =
        this.maskType === 'separator' || this.maskType === 'percent'
          ? this.maskType +
            (this.maskDecimalDigit ? '.' + this.maskDecimalDigit : '')
          : this.maskType;
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    let isInvalid = true;
    this.min = null;
    this.max = null;
    switch (this.type) {
      case 'emial':
        isInvalid = !ValidatorsHelper.isEmailValid(this._value);
        return isInvalid ? { isInvalid: isInvalid } : null;
        break;
      case 'fax':
        this.min = this._phonelengthMin;
        this.max = this._phonelengthMax;

        isInvalid = !ValidatorsHelper.isFaxValid(this._value);
        return isInvalid ? { isInvalid: isInvalid } : null;
        break;
      case 'phone':
        this.min = this._phonelengthMin;
        this.max = this._phonelengthMax;

        isInvalid = !ValidatorsHelper.isPhoneValid(this._value);
        return isInvalid ? { isInvalid: isInvalid } : null;
        break;
      default:
        isInvalid = this._value && this.min && this._value.length < this.min;
        return isInvalid ? { minLength: isInvalid } : null;
        break;
    }
  }

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

  public onChange(event) {
    if (event.data !== undefined) {
      this.onChangeCallback.emit(this.value);
    }

    this.onChangeFn(this.value);

    if (this.type == 'file') {
      this.onFileSelectedCallback.emit(event.target.files[0]);
    }
  }

  numberOnly(event: any): boolean {
    if (!this.onlyNumber) return true;
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
      return false;
    }
    return true;
  }

  onEnter(e) {
    this.onEnterCallback.emit(e);
  }

  keydownHandler(event: KeyboardEvent) {
    this.keydownCallback.emit(event);
  }

  focusHandler(event: Event) {
    this.focusCallback.emit(event);
  }

  setFocus() {
    this.inputRef.nativeElement.focus();
  }
}
