import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  badPWD = false;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required]],
      pwd: ['', [Validators.required]]
    });
  }

  login() {
    if (this.signInForm.value.username !== '' && this.signInForm.value.pwd !== '') {
      this.authService.connexion(this.signInForm.value).subscribe(
        data => { },
        err => {
          this.badPWD = true;
          this.signInForm.controls['username'].setValue('');
          this.signInForm.controls['pwd'].setValue('');
        },
        () => {
          if (this.authService.currentUser !== undefined) {
            this.router.navigateByUrl('/user/chat');
          }
        });
    } else {
      this.badPWD = true;
    }
  }
}
