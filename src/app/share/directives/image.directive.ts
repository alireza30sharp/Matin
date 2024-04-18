import { Directive, HostListener, Input, ViewChild, ElementRef, OnInit, OnChanges } from '@angular/core';

@Directive({
  selector: 'img[default]',
  host: {
    '(error)': 'updateUrl()',
    '[src]': 'src'
  }
})
export class DefaultImage implements OnChanges {
  @Input() src?: string | undefined;
  @Input() default!: string;


  constructor(

  ) { }

  ngOnChanges(): void {

  }


  public updateUrl(): void {
    this.src = this.default;
  }
}
