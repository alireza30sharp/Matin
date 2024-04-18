import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { AdminAuthGuard } from './services/admin-auth.guard';
import { FromComponent } from './share/components';
import { LoadingComponent } from './loading/loading.component';

const desktopRoutes: Route[] = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () => import('./idp/idp.module').then((m) => m.IdpModule),
  },

  {
    path: 'app',
    loadChildren: () => import('./app/app.module').then((m) => m.AppModule),
    //canActivate: [AdminAuthGuard],
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./company/company.module').then((m) => m.CompanyModule),
    //canActivate: [AdminAuthGuard],
  },
  {
    path: 'from ',
    component: FromComponent,
  },
  {
    path: 'loading',
    component: LoadingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(desktopRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
