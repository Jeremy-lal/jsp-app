import { NoteFormComponent } from './components/note-form/note-form.component';
import { SharedModule } from './../../shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableNoteComponent } from './components/table-note/table-note.component';



@NgModule({
  declarations: [
    UserFormComponent,
    NoteFormComponent,
    TableNoteComponent
  ],
  imports: [
    CommonModule, SharedModule
  ]
})
export class AdminSharedModule { }
