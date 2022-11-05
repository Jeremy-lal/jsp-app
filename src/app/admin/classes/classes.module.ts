import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes/classes.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '', component: ClassesComponent,

  }
]


@NgModule({
  declarations: [
    ClassesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ClassesModule { }
