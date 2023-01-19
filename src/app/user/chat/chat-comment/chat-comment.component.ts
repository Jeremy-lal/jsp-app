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
  @Input() mode!: string;
  @Output() showResponse = new EventEmitter<boolean>();
  @Output() giveMessage = new EventEmitter<Comment>();
  @Output() dataToDisplay = new EventEmitter<Comment[]>();
  @Output() dataResponse = new EventEmitter<Comment[]>();
  @Output() update = new EventEmitter<Comment>();

  nbReponse!: number;
  comments!: Comment[];
  currentUser: IUser | undefined;
  actionAcces = ['admin', 'superAdmin'];

  imgUrl = environment.serverUrl.picture;

  constructor(public commentService: CommentService, private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.commentService.getNumberResponse(this.comment).subscribe((data) => {
      this.nbReponse = data.count;
    });
  }

  displayResponse() {
    this.commentService.commentIdForResponse = this.comment.id;
    this.showResponse.emit(true);
    this.giveMessage.emit(this.comment);
  }

  updateComment(comment: Comment) {
    this.update.emit(comment)
  }

  deleteComment(comment: Comment) {
    this.commentService.deleteComment(comment.id).subscribe(() => {
    });
    setTimeout(() => {
      this.reload();
    }, 20);
  }

  reload() {
    this.reloadComment();
    this.reloadResponse();
  }

  reloadComment() {
    this.commentService.getComments(this.commentService.locate).subscribe((data) => {
      this.dataToDisplay.emit(data);
    });
  }

  reloadResponse() {
    this.commentService.getResponseCommentById().subscribe((datas) => {
      this.dataResponse.emit(datas);
    });
  }

  convertTextArea() {
    return this.comment.content.split('\n');
  }

}
