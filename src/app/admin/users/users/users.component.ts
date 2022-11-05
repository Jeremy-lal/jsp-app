import { TableNoteComponent } from './../../shared/components/table-note/table-note.component';
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

  displayedColumns = ['position', 'firstname', 'lastname', 'status', 'actions']

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private userService: UserService) { }

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
    dialogRef.afterClosed().subscribe(() => window.location.reload())
  }

  openNote(user: IUser) {
    this.dialog.open(TableNoteComponent, {
      width: '50%',
      data: user
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => window.location.reload());
  }

  updateUser(user: IUser) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '70%',
      data: user
    });
    dialogRef.afterClosed().subscribe(() => window.location.reload());
  }
}
