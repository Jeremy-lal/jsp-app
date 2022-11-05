import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AdminSharedModule } from './shared/admin-shared.module';


const routes: Route[] = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('../user/chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'classes',
    loadChildren: () => import('../user/classes/classes.module').then(m => m.ClassesModule)
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AdminSharedModule
  ]
})
export class AdminModule { }
