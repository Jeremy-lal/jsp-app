import { AuthService } from './auth-service';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { IFile } from '../models/file.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  static URL = environment.serverUrl.file;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserFiles(): Observable<IFile[]> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.get<IFile[]>(FilesService.URL + 'user', { headers })
  }

  getAll(): Observable<IFile[]> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.get<IFile[]>(FilesService.URL, { headers })
  }

  saveFileBdd(file: IFile) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.post<any>(FilesService.URL + 'file', file, { headers })
  }

  deleteFile(id: number) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.delete<any>(FilesService.URL + id, { headers })
  }

  saveFile(formData: any) {
    return this.http.post<any>(FilesService.URL, formData)
  }
}
