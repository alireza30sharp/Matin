import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as _shareMls from '@share/models';
import * as _shareSvc from '@share/services';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit, AfterViewInit {
  onActiveIndexChange() {}
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {}
}
