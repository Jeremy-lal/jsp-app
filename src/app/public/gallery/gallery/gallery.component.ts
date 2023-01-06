import { ActivatedRoute } from '@angular/router';
import { GalleryService } from './../../../core/services/gallery-service';
import { Component, OnInit } from '@angular/core';
import { GalleryImg } from 'src/app/core/models/gallery.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images: GalleryImg[] = []
  imagesDivided: GalleryImg[][] = []

  urlImages = environment.serverUrl.gallery;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ imgs }) => {
      this.images = imgs;
      this.imagesDivided = this.divideArray(this.images)
    })
  }

  divideArray(arr: GalleryImg[]) {
    let result: GalleryImg[][] = [[], [], [], []];
    for (let i = 0; i < arr.length; i++) {
      result[i % 4].push(arr[i]);
    }
    return result;
  }

}

