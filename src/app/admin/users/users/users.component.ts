import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthService } from 'src/app/core/services/auth-service';
import { NoteAdminComponent } from './../../shared/components/note-admin/note-admin.component';
import { UserService } from 'src/app/core/services/user-service';
import { UserFormComponent } from '../../shared/components/user-form/user-form.component';
import { IUser } from './../../../core/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[] = []
  usersFiltered: IUser[] = []
  displayPwdRefresh = false;

  userSelected!: IUser;


  displayedColumns = ['position', 'firstname', 'lastname', 'status', 'actions']

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ users }) => {
      const data = users.reverse()
      this.users = data ?? []
      this.usersFiltered = data ?? []
    })
  }

  filter(filter: string) {
    if (filter === 'all') {
      this.usersFiltered = this.users;
    } else {
      this.usersFiltered = this.users.filter(el => el.status === filter)
    }
  }

  openUserForm() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '70%',
    });
    dialogRef.afterClosed().subscribe((reload) => {
      if (reload) window.location.reload()
    });
  }

  updateUser(user: IUser) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '70%',
      data: user
    });
    dialogRef.afterClosed().subscribe((reload) => {
      if (reload) window.location.reload()
    });
  }

  openNote(user: IUser) {
    this.dialog.open(NoteAdminComponent, {
      width: '50%',
      data: user
    });
  }

  deleteUser(user: IUser) {
    const validate = confirm(`Êtes-vous sûr de vouloir supprimer ${user.firstname} ${user.lastname}`)

    if (validate) {
      this.userService.deleteUser(user.id!).subscribe(() => window.location.reload());
    }
  }

  resetPassword(user: IUser) {
    this.userSelected = user;
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '30%',
      data: user
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) this.validateRefresh(data)
    });
  }

  validateRefresh(newPwd: string) {
    this.authService.refreshPwd(this.userSelected, newPwd).subscribe(
      () => {
        alert('Mot de passe réinitialisé avec succès')
      },
      (err) => {
        alert('Erreur lors de la réinitialisation du mot de passe')
      })
  }

}
