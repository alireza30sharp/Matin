import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ki-iframe',
  templateUrl: './ki-iframe.component.html',
  styleUrls: ['./ki-iframe.component.scss'],
})
export class KiIframeComponent implements OnInit {
  @Input() url: string;
  @Input() title: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}
}
