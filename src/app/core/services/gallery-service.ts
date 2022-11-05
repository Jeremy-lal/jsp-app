import { AuthService } from './auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gallery, IGallery } from './../models/gallery.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  static URL = environment.serverUrl.gallery;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getImgGallery(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(GalleryService.URL);
  }

  save(img: Gallery) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.post<any>(GalleryService.URL, img, { headers })
  }

  saveImg(formData: any) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.post<any>(GalleryService.URL + 'img', formData, { headers })
  }

  delete(img: IGallery) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.post(GalleryService.URL + 'delete', { id: img.id, name: img.name }, { headers })
  }
}
