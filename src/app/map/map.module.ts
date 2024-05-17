
import { NgModule } from '@angular/core';
///////////map

import {TableModule} from 'primeng/table';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {GMapModule} from 'primeng/gmap';
import { MapComponent } from './pages/map/map.component';
import { CountryService } from './service/country.service';
import { DialogMap } from './components/dialog/map-dialog';
import { MapRoutingModule } from './map-routing.module';
//end ,ap



@NgModule({
  imports: [
    TableModule,
    ContextMenuModule,
    DynamicDialogModule,
    GMapModule,
    MapRoutingModule
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
    DialogMap
  ],
  entryComponents: [
		DialogMap
	],
})
export class MapModule {}
