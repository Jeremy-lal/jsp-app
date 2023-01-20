import { AuthService } from 'src/app/core/services/auth-service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from 'src/app/core/models/user.model';
import { CommentService } from 'src/app/core/services/comment-service';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/core/models/comment.model';

@Component({
  selector: 'app-chat-comment',
  templateUrl: './chat-comment.component.html',
  styleUrls: ['./chat-comment.component.scss']
})
export class ChatCommentComponent implements OnInit {
  @Input() comment!: Comment;
  @Input() answerMode = false;
  @Output() showResponse = new EventEmitter<Comment>();
  @Output() delete = new EventEmitter<Comment>();



  @Output() dataToDisplay = new EventEmitter<Comment[]>();
  @Output() dataResponse = new EventEmitter<Comment[]>();
  @Output() update = new EventEmitter<Comment>();

  comments!: Comment[];
  currentUser: IUser | undefined;
  actionAcces = ['admin', 'superAdmin'];

  imgUrl = environment.serverUrl.picture;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }

  displayResponse() {
    this.showResponse.emit(this.comment);
  }

  updateComment(comment: Comment) {
    this.update.emit(comment)
  }

  deleteComment(comment: Comment) {
    this.delete.emit(comment);
  }

  reload() {
    this.reloadComment();
    this.reloadResponse();
  }

  reloadComment() {
    // this.commentService.getComments(this.commentService.locate).subscribe((data) => {
    //   this.dataToDisplay.emit(data);
    // });
  }

  reloadResponse() {
    // this.commentService.getResponseCommentById().subscribe((datas) => {
    //   this.dataResponse.emit(datas);
    // });
  }

  convertTextArea() {
    return this.comment.content.split('\n');
  }

}
