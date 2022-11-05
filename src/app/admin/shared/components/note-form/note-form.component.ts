import { NoteService } from './../../../../core/services/note.service';
import { IUser } from './../../../../core/models/user.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {
  @Input() user!: IUser;
  @Output() newNoteAdded = new EventEmitter();

  noteForm = this.fb.group({
    title: ['', Validators.required],
    valeur: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private noteService: NoteService) { }

  ngOnInit() { }

  createNote(): void {
    const note = { ...this.getFormValue(), user_id: this.user.id ?? 0 }
    this.noteService.addNote(note).subscribe((data) => {
      this.newNoteAdded.emit(data)
    });
  }

  getFormValue() {
    return {
      title: this.noteForm.controls['title'].value ?? '',
      valeur: +this.noteForm.controls['valeur'].value! ?? 0,
    }
  }
}
