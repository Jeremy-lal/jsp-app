import { AuthService } from './auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model'

@Injectable(
  { providedIn: 'root' }
)
export class UserService {
  static URL = environment.serverUrl.user;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllUsers(): Observable<IUser[]> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.get<IUser[]>(UserService.URL, { headers });
  }

  createUser(newUser: IUser) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.post(AuthService.URL_AUTH + 'signup', newUser, { headers });
  }

  updateUser(userToUpdate: IUser) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    const id = userToUpdate.id;
    delete userToUpdate.note;
    return this.http.put(AuthService.URL + id, userToUpdate, { headers });
  }

  updateUserPicture(userToUpdate: IUser) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    const id = userToUpdate.id;
    return this.http.put(AuthService.URL + 'picture/' + id, userToUpdate, { headers });
  }

  deleteUser(id: number) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.delete(AuthService.URL + id, { headers });
  }
}
