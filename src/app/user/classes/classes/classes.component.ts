import { IUser } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth-service';
import { MatDialog } from '@angular/material/dialog';
import { FilesService } from './../../../core/services/file-service';
import { IFile } from '../../../core/models/file.model';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileFormComponent } from 'src/app/shared/components/file-form/file-form.component';

@Component({
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  files: IFile[] = []
  filesFiltered: IFile[] = []
  isAdmin = false;
  currentUser: IUser | undefined;

  displayedColumns = ['position', 'name', 'grp', 'actions']
  groupes = ['Commun', 'Jsp1', 'Jsp2', 'Jsp3', 'Jsp4', 'Admin']

  constructor(private filesService: FilesService, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin;
    this.currentUser = this.authService.currentUser;
    this.getFiles()
  }

  getFiles() {
    this.filesService.getUserFiles().subscribe((files) => {
      this.files = files ?? []
      this.filesFiltered = files ?? []
    })
  }

  filter(filter: string) {
    if (filter === 'all') {
      this.filesFiltered = this.files;
    } else {
      this.filesFiltered = this.files.filter(el => el.grp === filter)
    }
  }

  openFileForm() {
    const dialogRef = this.dialog.open(FileFormComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(() => this.getFiles())
  }

  download(fileName: string) {
    window.open(environment.serverUrl.file + fileName, '_blank');
  }

  deleteFile(id: number) {
    this.filesService.deleteFile(id).subscribe(() => this.getFiles())
  }
}
