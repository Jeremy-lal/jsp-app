import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model'
import { UserService } from '../services/user-service'

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<IUser[] | null> {
  constructor(private userService: UserService) { }

  resolve(): Observable<IUser[]> {
    return this.userService.getAllUsers();
  }
}
