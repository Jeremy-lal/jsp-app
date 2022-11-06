import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'new-pwd-form',
  templateUrl: 'new-pwd-form.component.html',
  styleUrls: ['new-pwd-form.component.scss']
})

export class NewPwdFormComponent {
  @Input() message = ''
  @Output() passwords = new EventEmitter();

  newPwd = this.fb.group({
    pwd: ['', [Validators.required]],
    newPwd1: ['', [Validators.required, Validators.minLength(8)]],
    newPwd2: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private fb: FormBuilder) { }

  changePwd() {
    const pwd = this.newPwd.controls.pwd.value ?? '';
    const newPwd = this.newPwd.controls.newPwd1.value
    const newPwdConfirm = this.newPwd.controls.newPwd2.value
    if (newPwd === newPwdConfirm) {
      this.passwords.emit({ pwd, newPwd })
    } else {
      this.message = 'Les deux mots de passe doivent être identique.';
    }
  }
}
