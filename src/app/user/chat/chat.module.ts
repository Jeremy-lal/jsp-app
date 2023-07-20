import { ChatCommentUpdateComponent } from './chat-comment-update/chat-comment-update.component';
import { ChatCommentComponent } from './chat-comment/chat-comment.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '', component: ChatComponent
  }
]


@NgModule({
  declarations: [
    ChatComponent, ChatCommentComponent, ChatCommentUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ChatModule { }
