import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Authority } from './core/config/authorities';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    data: {
      templateEmpty: true
    },
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'login',
    data: {
      templateEmpty: true
    },
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import(`./user/user.module`).then(m => m.UserModule),
  },
  {
    path: 'admin',
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppRoutingModule { }
