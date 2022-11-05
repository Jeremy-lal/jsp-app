import { INote } from './../../../../core/models/note.model';
import { IUser } from './../../../../core/models/user.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-table-note',
  templateUrl: './table-note.component.html',
  styleUrls: ['./table-note.component.scss']
})
export class TableNoteComponent implements OnInit {
  notes: INote[] = []
  displayedColumns = ['position', 'title', 'value']

  displayForm = false;

  constructor(public dialogRef: MatDialogRef<TableNoteComponent>, @Inject(MAT_DIALOG_DATA) public user: IUser) { }

  ngOnInit(): void {
    if (this.user) {
      this.notes = this.user.note ?? []
    }
  }

  addNote(note: INote) {
    this.notes.push(note)
    this.displayForm = false;
  }

  get average() {
    let sum = this.notes.map(t => +t.valeur).reduce((acc, value) => acc + value, 0);
    return Math.round(sum / this.user.note!.length * 100) / 100;
  }

}
