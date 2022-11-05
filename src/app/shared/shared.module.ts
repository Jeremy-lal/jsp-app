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
    TemplateSidenavComponent
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
    TemplateEmptyComponent,
    TemplateSidenavComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class SharedModule { }
