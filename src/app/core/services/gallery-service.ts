import { AuthService } from './auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GalleryImg, IGalleryImg } from './../models/gallery.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  static URL = environment.serverUrl.gallery;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getImgGallery(): Observable<IGalleryImg[]> {
    return this.http.get<GalleryImg[]>(GalleryService.URL);
  }

  save(img: GalleryImg) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.post<any>(GalleryService.URL, img, { headers })
  }

  saveImg(formData: any) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.post<any>(GalleryService.URL + 'img', formData, { headers })
  }

  delete(img: IGalleryImg) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.post(GalleryService.URL + 'delete', { id: img.id, name: img.name }, { headers })
  }
}
