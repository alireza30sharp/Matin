import {Component} from '@angular/core';

import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
    template: `

<p-gmap #mapa [options]="this.config.data.options" [overlays]="this.config.data.overlays"
[style]="{'width':'520px%','height':'420px'}" ></p-gmap>        
    `
})
export class DialogMap {       
    constructor(  public ref: DynamicDialogRef, public config: DynamicDialogConfig  ) { }
    ngOnInit() {
       
    }
}