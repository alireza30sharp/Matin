import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import * as pgs from './pages';
const desktopRoutes: Route[] = [
  {
    path: '',
    component: pgs.LayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(desktopRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
