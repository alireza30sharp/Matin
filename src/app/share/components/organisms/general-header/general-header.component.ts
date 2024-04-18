import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-general-header',
  templateUrl: './general-header.component.html',
  styleUrls: ['./general-header.component.scss'],
})
export class GeneralHeaderComponent implements OnChanges {
  @Input() title: string;
  @Input() subtitle?: string;
  @Input() hideBackButton?: boolean;
  @Input() backButtonTooltip?: boolean;

  @Output() backCallback = new EventEmitter<Event>();

  backButtonIsShow: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.backButtonIsShow = this.backCallback.observed && !this.hideBackButton;
  }

  backHandler(e: Event) {
    this.backCallback.emit(e);
  }
}
