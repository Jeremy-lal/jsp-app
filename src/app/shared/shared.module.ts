import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { FileFormComponent } from './components/file-form/file-form.component';
import { NewPwdFormComponent } from './components/new-pwd-form/new-pwd-form.component';
import { ProfilPictureComponent } from './components/profil-picture/profil-picture.component';
import { TableNoteComponent } from './components/table-note/table-note.component';
import { RouterModule } from '@angular/router';
import { TemplateSidenavComponent } from './layout/template-sidenav/template-sidenav.component';
import { TemplateEmptyComponent } from './layout/template-empty/template-empty.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    TemplateEmptyComponent,
    TemplateSidenavComponent,
    TableNoteComponent,
    ProfilPictureComponent,
    NewPwdFormComponent,
    FileFormComponent,
    CommentFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    TemplateEmptyComponent,
    TemplateSidenavComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    TableNoteComponent,
    ProfilPictureComponent,
    NewPwdFormComponent,
    FileFormComponent,
    CommentFormComponent,
    RouterModule
  ]
})
export class SharedModule { }
