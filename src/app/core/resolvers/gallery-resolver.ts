import { GalleryService } from 'src/app/core/services/gallery-service';
import { IGalleryImg } from './../models/gallery.model';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GalleryImgsResolver implements Resolve<IGalleryImg[]> {
  constructor(private galleryService: GalleryService) { }

  resolve(): Observable<IGalleryImg[]> {
    return this.galleryService.getImgGallery();
  }
}
