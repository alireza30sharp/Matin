import { Component, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem, MessageService } from 'primeng/api';
import { Country } from '../../interface/country';
import { CountryService } from '../../service/country.service';
import { DialogMap } from '../../components/dialog/map-dialog';

declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [DialogService,MessageService]
})
export class MapComponent {
  // ref: DynamicDialogRef = new DynamicDialogRef;
  // items: MenuItem[] = [];
  // countries: Country[] = [];
  // country!:Country;

  // constructor(private countryService: CountryService, public dialogService: DialogService) { }

  // ngOnInit() {
  //   this.countryService.getCountries().then(data => this.countries = data);
  //   this.items = [
  //     { label: 'View map', icon: 'pi pi-fw pi-map-marker', command: () => this.showDialog() }
  //   ];
  // }

  // showDialog() {
  //   this.ref = this.dialogService.open(DialogMap, {
  //     data: {
  //       options: {
  //         center: { lat: +this.country.lat!, lng: +this.country.long! },
  //         zoom: 3
  //       },
  //       overlays: [
  //         new google.maps.Marker({ position: { lat: +this.country.lat!, lng: +this.country.long! }, title: this.country.name } ),
        
  //       ]
  //     },
  //     header: 'COUNTRY ' + this.country.name,
  //     width: '70%',
  //     contentStyle: { "max-height": "500px", "overflow": "auto" },
  //     baseZIndex: 10000
  //   });
  // }

  // ngOnDestroy() {
  //   alert('destroy');
  //   if (this.ref) {
  //     this.ref.close();
  //   }
  // }
  //=============================================


  options: any;

  overlays: any[];

  dialogVisible: boolean;

  markerTitle: string;

  selectedPosition: any;

  infoWindow: any;

  draggable: boolean;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
      this.options = {
          center: {lat: 36.890257, lng: 30.707417},
          zoom: 12
      };

      this.initOverlays();

      this.infoWindow = new google.maps.InfoWindow();
  }

  handleMapClick(event) {
    debugger
      this.dialogVisible = true;
      this.selectedPosition = event.latLng;
  }

  handleOverlayClick(event) {
      let isMarker = event.overlay.getTitle != undefined;

      if (isMarker) {
          let title = event.overlay.getTitle();
          this.infoWindow.setContent('' + title + '');
          this.infoWindow.open(event.map, event.overlay);
          event.map.setCenter(event.overlay.getPosition());

          this.messageService.add({severity:'info', summary:'Marker Selected', detail: title});
      }
      else {
          this.messageService.add({severity:'info', summary:'Shape Selected', detail: ''});
      }
  }

  addMarker() {
      this.overlays.push(new google.maps.Marker({position:{lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng()}, title:this.markerTitle, draggable: this.draggable}));
      this.markerTitle = null;
      this.dialogVisible = false;
  }

  handleDragEnd(event) {
      this.messageService.add({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
  }

  initOverlays() {
      if (!this.overlays||!this.overlays.length) {
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
  }

  zoomIn(map) {
      map.setZoom(map.getZoom()+1);
  }

  zoomOut(map) {
      map.setZoom(map.getZoom()-1);
  }

  clear() {
      this.overlays = [];
  }
}

