import { GalleryImgsResolver } from './../../core/resolvers/gallery-resolver';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Route[] = [
  {
    path: "",
    component: GalleryComponent,
    resolve: {
      imgs: GalleryImgsResolver
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [GalleryComponent],
})
export class GalleryModule { }
