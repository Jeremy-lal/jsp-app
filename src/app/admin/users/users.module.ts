import { SharedModule } from './../../shared/shared.module';
import { UserResolver } from './../../core/resolvers/users-resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '', component: UsersComponent,
    resolve: {
      users: UserResolver
    }
  }
]

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class UsersModule { }
