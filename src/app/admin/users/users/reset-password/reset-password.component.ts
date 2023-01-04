import { IUser } from './../../../../core/models/user.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.scss'],
})

export class ResetPasswordComponent implements OnInit {
  newPwd = ''

  constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>, @Inject(MAT_DIALOG_DATA) public user: IUser) { }

  ngOnInit() { }

  cancel(): void {
    this.dialogRef.close();
  }
}
