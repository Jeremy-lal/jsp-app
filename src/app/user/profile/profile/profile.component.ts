import { IUser } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth-service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: IUser | undefined;
  message!: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

  changePwd(passwords: { pwd: string, newPwd: string }) {
    this.authService.updateUserPwd(passwords.pwd, passwords.newPwd).subscribe((data) => this.message = data);
  }
}
