import { GalleryFormComponent } from './../../shared/components/gallery-form/gallery-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IGallery } from './../../../core/models/gallery.model';
import { GalleryService } from './../../../core/services/gallery-service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  galleryImgs$!: Observable<IGallery[]>;
  urlImages = environment.serverUrl.gallery;

  displayedColumns = ['position', 'name', 'actions']

  constructor(private galleryService: GalleryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getGallery()
  }

  getGallery() {
    this.galleryImgs$ = this.galleryService.getImgGallery();
  }

  openGalleryForm() {
    const dialogRef = this.dialog.open(GalleryFormComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(() => this.getGallery())
  }

  deleteImg(img: IGallery) {
    this.galleryService.delete(img).subscribe(() => this.getGallery())
  }
}
