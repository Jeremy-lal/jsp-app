import { GalleryModule } from './../admin/gallery/gallery.module';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Route[] = [
  { path: "", loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: "gallery", loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule) }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PublicModule { }
