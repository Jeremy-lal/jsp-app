import { AuthService } from 'src/app/core/services/auth-service';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user-service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  update = false;
  isSuperAdmin = false;

  userForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    status: ['', Validators.required],
    username: ['', Validators.required],
    pwd: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UserFormComponent>, public userService: UserService,
    @Inject(MAT_DIALOG_DATA) public userToUpdate: User, private authService: AuthService) { }

  ngOnInit() {
    this.isSuperAdmin = this.authService.isSuperAdmin
    if (this.userToUpdate) {
      this.update = true;
      this.userForm.controls.firstname.setValue(this.userToUpdate.firstname);
      this.userForm.controls.lastname.setValue(this.userToUpdate.lastname);
      this.userForm.controls.username.setValue(this.userToUpdate.username);
      this.userForm.controls.pwd.setValue(this.userToUpdate.pwd);
      this.userForm.controls.status.setValue(this.userToUpdate.status);
    }
  }

  onSubmit() {
    this.update ? this.updateUser() : this.createUser()
  }

  createUser(): void {
    const user = { ...this.getFormValue(), imgURL: 'default.png' }
    this.userService.createUser(user).subscribe();
    this.dialogRef.close();
  }

  updateUser(): void {
    const userUpdated = { ...this.userToUpdate, ...this.getFormValue() }
    this.userService.updateUser(userUpdated).subscribe();
    this.dialogRef.close();
  }

  getFormValue() {
    return {
      firstname: this.userForm.controls['firstname'].value ?? '',
      lastname: this.userForm.controls['lastname'].value ?? '',
      username: this.userForm.controls['username'].value ?? '',
      pwd: this.userForm.controls['pwd'].value ?? '',
      status: this.userForm.controls['status'].value ?? '',
    }
  }
}
