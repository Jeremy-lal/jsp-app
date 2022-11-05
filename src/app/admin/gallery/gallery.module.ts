import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery/gallery.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '', component: GalleryComponent
  }
]

@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GalleryModule { }
