import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IGalleryImg } from 'src/app/core/models/gallery.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images: IGalleryImg[] = []
  imagesDivided: IGalleryImg[][] = []

  selectedImg!: number;
  selectedImgPosition!: number;
  displayImg = false;

  urlImages = environment.serverUrl.gallery;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ imgs }) => {
      this.images = imgs;
      this.imagesDivided = this.divideArray(this.images)
    })
  }

  divideArray(arr: IGalleryImg[]) {
    let result: IGalleryImg[][] = [[], [], [], []];
    for (let i = 0; i < arr.length; i++) {
      result[i % 4].push(arr[i]);
    }
    return result;
  }

  selectImg(id: number) {
    this.selectedImg = this.images.findIndex(obj => obj.id === id)
    this.displayImg = true;
  }

  getImgSelected() {
    return this.images[this.selectedImg].name
  }

  previous() {
    this.selectedImg -= 1;

    if (this.selectedImg < 0) {
      this.selectedImg = this.images.length - 1;
    }
  }

  next() {
    this.selectedImg += 1;

    if (this.selectedImg >= this.images.length) {
      this.selectedImg = 0;
    }
  }


}

