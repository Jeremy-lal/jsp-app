import { NoteAdminComponent } from './components/note-admin/note-admin.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { SharedModule } from './../../shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    UserFormComponent,
    NoteFormComponent,
    NoteAdminComponent
  ],
  imports: [
    CommonModule, SharedModule
  ]
})
export class AdminSharedModule { }
