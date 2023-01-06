import { GalleryService } from '../../../core/services/gallery-service';
import { GalleryImg } from '../../../core/models/gallery.model';
import { environment } from '../../../../environments/environment';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  sidenav = false;

  constructor(private route: Router) { }

  goToHome() {
    this.route.navigateByUrl('/login');
  }

  navigateToSection(element: string) {
    const htmlElement = document.getElementById(element);
    window.scrollTo({ top: htmlElement!.offsetTop - 80, behavior: 'smooth' });
  }

  dragonSound() {
    const dragon = new Audio('/assets/audio/dragon.mp3');
    dragon.play()
  }
}

