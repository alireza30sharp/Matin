import {Component} from '@angular/core';

import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
declare var google: any;
@Component({
    template: `
<p-gmap [options]="options" [overlays]="overlays" [style]="{'width':'100%','height':'320px'}"
            (onMapClick)="handleMapClick($event)" (onOverlayClick)="handleOverlayClick($event)"></p-gmap>
<!-- <p-gmap #mapa [options]="this.config.data.options" [overlays]="this.config.data.overlays"
[style]="{'width':'520px%','height':'420px'}" ></p-gmap>         -->
    `
})
export class DialogMap {  
    options: any;

    overlays: any[];     
    constructor(  public ref: DynamicDialogRef, public config: DynamicDialogConfig  ) { }
    ngOnInit() {
        this.options = {
            center: {lat: 36.890257, lng: 30.707417},
            zoom: 12
        };

        this.overlays = [
            new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Konyaalti"}),
            new google.maps.Marker({position: {lat: 36.883707, lng: 30.689216}, title:"Ataturk Park"}),
            new google.maps.Marker({position: {lat: 36.885233, lng: 30.702323}, title:"Oldtown"}),
            new google.maps.Polygon({paths: [
                {lat: 36.9177, lng: 30.7854},{lat: 36.8851, lng: 30.7802},{lat: 36.8829, lng: 30.8111},{lat: 36.9177, lng: 30.8159}
            ], strokeOpacity: 0.5, strokeWeight: 1,fillColor: '#1976D2', fillOpacity: 0.35
            }),
            new google.maps.Circle({center: {lat: 36.90707, lng: 30.56533}, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500}),
            new google.maps.Polyline({path: [{lat: 36.86149, lng: 30.63743},{lat: 36.86341, lng: 30.72463}], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2})
        ];
    }


    handleMapClick(event) {
        //event: MouseEvent of Google Maps api
    }

    handleOverlayClick(event) {
        //event.originalEvent: MouseEvent of Google Maps api
        //event.overlay: Clicked overlay
        //event.map: Map instance
    }
}