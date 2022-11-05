import { AuthService } from '../services/auth-service';
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    const token = localStorage.getItem('JWT-TOKEN') ?? '';
    this.authService.setToken(token);

    return this.authService.authenticate().pipe(catchError((error) => {
      this.router.navigateByUrl('/login');
      return throwError(error);
    }));
  }
}
