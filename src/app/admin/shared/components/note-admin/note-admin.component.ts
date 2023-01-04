import { NoteService } from './../../../../core/services/note.service';
import { INote } from '../../../../core/models/note.model';
import { IUser } from '../../../../core/models/user.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-note-admin',
  templateUrl: './note-admin.component.html',
  styleUrls: ['./note-admin.component.scss']
})
export class NoteAdminComponent implements OnInit {
  notes: INote[] = []
  displayedColumns = ['position', 'title', 'value', 'delete']

  displayForm = false;

  constructor(private noteService: NoteService, public dialogRef: MatDialogRef<NoteAdminComponent>, @Inject(MAT_DIALOG_DATA) public user: IUser) { }

  ngOnInit(): void {
    if (this.user) {
      this.notes = this.user.note ?? []
    }
  }

  addNote(note: INote) {
    this.notes.push(note)
    this.displayForm = false;
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id).subscribe(() => {
      this.notes = this.notes.filter(el => el.id !== id)
      this.user.note = this.notes
    });
  }

  get average() {
    let sum = this.notes.map(t => +t.valeur).reduce((acc, value) => acc + value, 0);
    return Math.round(sum / this.user.note!.length * 100) / 100;
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
