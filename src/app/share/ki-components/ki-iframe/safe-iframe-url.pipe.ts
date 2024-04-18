import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeIframeUrl',
})
export class SafeIframeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): any {
    let html = '<iframe class="h-100 w-100" src="' + url + '" allowfullscreen></iframe>';
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
