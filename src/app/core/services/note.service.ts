import { INote } from './../models/note.model';
import { AuthService } from 'src/app/core/services/auth-service';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  static URL = environment.serverUrl.note;

  toUpdate = false;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserNote(id: number) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.get<INote[]>(NoteService.URL + id, { headers });
  }

  addNote(note: INote) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.post(NoteService.URL, note, { headers });
  }

  updateNote(note: INote) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    const id = note.id;
    return this.http.put(NoteService.URL + id, note, { headers });
  }

  deleteNote(id: number) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.delete(NoteService.URL + id, { headers });
  }
}

