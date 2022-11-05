import { IFile } from '../../../core/models/file.model';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  files: IFile[] = []
  filesFiltered: IFile[] = []

  displayedColumns = ['position', 'name', 'grp', 'actions']
  groupes = ['Commun', 'Jsp1', 'Jsp2', 'Jsp3', 'Jsp4', 'Admin']
  constructor() { }

  ngOnInit(): void {
  }

  filter(filter: string) {
    this.filesFiltered = this.files.filter(el => el.grp === filter)
  }

  openFileForm() {

  }

}
