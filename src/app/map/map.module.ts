
import { NgModule } from '@angular/core';
///////////map

import {TableModule} from 'primeng/table';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {GMapModule} from 'primeng/gmap';
import { MapComponent } from './pages/map/map.component';
import { CountryService } from './service/country.service';
import { DialogMap } from './components/dialog/map-dialog';
import {ToastModule} from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { MapRoutingModule } from './map-routing.module';
import { LayoutComponent } from './pages';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from '@share/share.module';
//end ,ap



@NgModule({
  imports: [
    ShareModule,
    CommonModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    TableModule,
    DialogModule,
    ContextMenuModule,
    DynamicDialogModule,
    GMapModule,
    MapRoutingModule,
    
  ],
  exports: [
   
    TableModule,
    ContextMenuModule,
    DynamicDialogModule,
    GMapModule,
  ],
  providers: [CountryService],
  declarations: [
    MapComponent,
    LayoutComponent,
    DialogMap
  ],
  entryComponents: [
		DialogMap
	],
})
export class MapModule {}
