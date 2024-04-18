import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
const routes: Routes = [
  // { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'list',
        component: CompanyListComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
