import { INewComment } from './../../../core/models/comment.model';
import { IUser } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommentService } from 'src/app/core/services/comment-service';
import { Comment } from 'src/app/core/models/comment.model';

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  channel = 'commun'
  currentUser: IUser | undefined;
  isAdmin = false;
  comments: Comment[] = [];

  commentSelected: Comment | undefined;
  commentAnswers: Comment[] = [];

  channels = ['Commun', 'Question', 'JSP1', 'JSP2', 'JSP3', 'JSP4']

  @ViewChild('drawer') drawer: any;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, public commentService: CommentService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.isAdmin = this.authService.isAdmin;
    console.log(this.currentUser);

    this.route.queryParams.subscribe((data) => {
      if (!this.channels.includes(data['channel'])) {
        this.goToCommun()
      }
      if (!['Commun', 'Question'].includes(data['channel'])) {
        if (!(this.isAdmin || this.currentUser?.status.toUpperCase() === data['channel'])) {
          this.goToCommun()
        }
      }
      this.channel = data['channel']
      this.getChannelComments()
    })
  }

  getChannelComments() {
    this.commentService.getComments(this.channel).subscribe((data) => {
      this.comments = data;
    })
  }

  getCommentResponse(comment: Comment) {
    this.commentSelected = comment;
    this.commentService.getResponseCommentById(comment.id).subscribe((data) => {
      this.drawer.toggle()
      this.commentAnswers = data;
    })
  }

  saveComment(txt: string) {
    const comment: INewComment = {
      content: txt,
      grp: this.channel,
      user_id: this.currentUser?.id!
    };
    this.commentService.createComment(comment).subscribe((data) => this.getChannelComments())
  }

  goToCommun() {
    this.router.navigate(['/user/chat'], {
      queryParams: {
        channel: 'Commun',
      },
      queryParamsHandling: 'merge',
    });
  }

  toggleSide() {
    this.drawer.toggle()
  }

}
