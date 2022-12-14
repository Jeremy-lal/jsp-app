import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static URL = environment.serverUrl.user;
  static URL_AUTH = environment.serverUrl.auth;

  token: string | undefined;
  currentUser: IUser | undefined;
  isAdmin = false;
  isSuperAdmin = false;

  constructor(private http: HttpClient) { }

  setToken(token: string) {
    this.token = token;
  }

  getCurrentUser(): Observable<IUser> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token });
    return this.http.get<IUser>(AuthService.URL + 'user/me', { headers }).pipe(
      tap((user: IUser) => {
        this.currentUser = user;
      }));
  }

  authenticate(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      tap(el => {
        this.isAdmin = ['admin', 'superAdmin'].includes(el.status);
        this.isSuperAdmin = 'superAdmin' === el.status;
      }),
      map((user: IUser) => (user != null && user.id != null)));
  }

  connexion(user: IUser) {
    return this.http.post(AuthService.URL_AUTH + 'signin', user, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        const token = response.headers.get('JWT-TOKEN') ?? '';
        localStorage.setItem('JWT-TOKEN', token);
        this.currentUser = response.body;
        return response.body;
      }));
  }

  updateUserPwd(password: string, newPassword: string): Observable<string> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token });
    const params = {
      user: this.currentUser,
      pwd: password,
      newPwd: newPassword
    };
    return this.http.put<string>(AuthService.URL_AUTH + 'pwd', params, { headers });
  }

  refreshPwd(pers: IUser, newPassword: string): Observable<string> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token });
    const params = {
      user: pers,
      newPwd: newPassword
    };
    return this.http.put<string>(AuthService.URL_AUTH + 'pwd/refresh', params, { headers });
  }
}
