import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SizeType } from 'src/app/share/types/size.type';

@Component({
  selector: 'ki-button',
  templateUrl: './ki-button.component.html',
  styleUrls: ['./ki-button.component.scss'],
})
export class KiButtonComponent implements OnChanges {
  @Input() title: string;
  @Input() type: 'submit' | 'button';
  @Input() btnType:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light';
  @Input() size?: SizeType;
  @Input() varient?: 'fill' | 'outline' | 'text' = 'fill';
  @Input() isOutline: boolean;
  @Input() disabled: boolean;
  @Input() showLoading: boolean;
  @Input() matchParent?: boolean;
  @Input() for?: string;
  @Input() iconClassName?: string;
  @Input() tooltip?: string;
  @Output() clickCallback = new EventEmitter<Event>();

  @ViewChild('buttonRef', { static: false })
  buttonRef: ElementRef<HTMLButtonElement>;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOutline) this.varient = 'outline';
  }

  onBtnClicked(event: Event) {
    if (!this.showLoading) {
      this.clickCallback.emit(event);
    }
  }

  get innerElementRef() {
    return this.buttonRef;
  }
}
