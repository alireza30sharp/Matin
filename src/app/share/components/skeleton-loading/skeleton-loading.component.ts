import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'skeleton-loading',
  templateUrl: './skeleton-loading.component.html',
  styleUrls: ['./skeleton-loading.component.scss'],
})
export class SkeletonLoadingComponent implements OnInit {
  title = '';
  description = '';
  imgSrc = '';
  profileSrc = '';
  btn = '';

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.title = 'کیا سیستم';
      this.description = ' متن تست.';
      this.imgSrc = 'assets/images/logo-50.png';
      this.profileSrc = 'assets/images/i-book-shelf.svg';
      this.btn = 'دکمه';
    }, 5000);
  }
}
