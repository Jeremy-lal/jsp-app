import { GalleryService } from '../../../core/services/gallery-service';
import { GalleryImg } from '../../../core/models/gallery.model';
import { environment } from '../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sidenav = false;

  images: GalleryImg[] = [];
  urlImages = environment.serverUrl.gallery;

  constructor(private route: Router, private galleryService: GalleryService) { }

  ngOnInit() {
    this.getListImg()
  }

  goToHome() {
    this.route.navigateByUrl('/login');
  }

  getListImg() {
    this.galleryService.getImgGallery().subscribe((data) => {
      this.images = data;
      this.images = this.images.slice(0, 3);
    })
  }

  navigateToSection(element: string) {
    const htmlElement = document.getElementById(element);
    window.scrollTo({ top: htmlElement!.offsetTop - 260, behavior: 'smooth' });
  }

  dragonSound() {
    const dragon = new Audio('/assets/audio/dragon.mp3');

    dragon.play()
  }
}

