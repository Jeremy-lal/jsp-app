import { MatDialog } from '@angular/material/dialog';
import { FileFormComponent } from './../../shared/components/file-form/file-form.component';
import { FilesService } from './../../../core/services/file-service';
import { IFile } from '../../../core/models/file.model';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  files: IFile[] = []
  filesFiltered: IFile[] = []

  displayedColumns = ['position', 'name', 'grp', 'actions']
  groupes = ['Commun', 'Jsp1', 'Jsp2', 'Jsp3', 'Jsp4', 'Admin']

  constructor(private filesService: FilesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFiles()
  }

  getFiles() {
    this.filesService.getAll().subscribe((files) => {
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
