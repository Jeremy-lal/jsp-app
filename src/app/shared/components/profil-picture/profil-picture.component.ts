import { FilesService } from './../../../core/services/file-service';
import { UserService } from 'src/app/core/services/user-service';
import { IUser } from 'src/app/core/models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'profil-picture',
  templateUrl: 'profil-picture.component.html',
  styleUrls: ['profil-picture.component.scss'],
})
export class ProfilPictureComponent implements OnInit {
  @Input() user!: IUser;

  imgUrl = environment.serverUrl.picture;
  images: any;

  constructor(private userService: UserService, private filesService: FilesService) { }

  ngOnInit() { }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.onSubmit()
    }
  }

  onSubmit() {
    const formData = new FormData();
    const name = this.removeAccents(`${this.user.firstname}_${this.user.lastname}.jpg`);
    formData.append('picture', this.images, name);
    this.user.imgURL = name,
      this.filesService.saveProfilPicture(formData).subscribe(
        () => {
          this.userService.updateUserPicture(this.user).subscribe(() => window.location.reload());
        },
        (err) => console.log(err)
      );
  }

  removeAccents(stringToconvert: string) {
    const accent = [
      /[\300-\306]/g, /[\340-\346]/g, // A, a
      /[\310-\313]/g, /[\350-\353]/g, // E, e
      /[\314-\317]/g, /[\354-\357]/g, // I, i
      /[\322-\330]/g, /[\362-\370]/g, // O, o
      /[\331-\334]/g, /[\371-\374]/g, // U, u
      /[\321]/g, /[\361]/g, // N, n
      /[\307]/g, /[\347]/g, // C, c
    ];
    const noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

    let str = stringToconvert;
    for (let i = 0; i < accent.length; i++) {
      str = str.replace(accent[i], noaccent[i]);
    }

    return str;
  }
}
