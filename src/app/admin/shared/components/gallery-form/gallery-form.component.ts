import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { GalleryImg } from 'src/app/core/models/gallery.model';
import { GalleryService } from 'src/app/core/services/gallery-service';

@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.scss']
})
export class GalleryFormComponent implements OnInit {
  images: any;

  constructor(private galleryService: GalleryService, private dialog: DialogRef) { }

  ngOnInit() {
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    const name = `${this.uuidv4()}`;

    const img: GalleryImg = {
      name: name,
      originalName: this.images.name
    }

    formData.append('picture', this.images, name);

    this.galleryService.saveImg(formData).subscribe(
      () => {
        this.galleryService.save(img).subscribe(() => this.dialog.close());
      },
      () => alert("Une erreur est survenue lors de l'enregistrement")
    )
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
