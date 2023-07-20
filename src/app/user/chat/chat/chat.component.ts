import { ChatCommentUpdateComponent } from './../chat-comment-update/chat-comment-update.component';
import { INewComment } from './../../../core/models/comment.model';
import { IUser } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommentService } from 'src/app/core/services/comment-service';
import { Comment } from 'src/app/core/models/comment.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  channel = 'commun'
  currentUser: IUser | undefined;
  isAdmin = false;
  comments: Comment[] = [];

  commentSelected: Comment | undefined;
  commentAnswers: Comment[] = [];

  channels = ['Commun', 'Question', 'JSP1', 'JSP2', 'JSP3', 'JSP4']

  @ViewChild('drawer') drawer: any;
  @ViewChild('commentsList', { static: true }) commentsList!: ElementRef;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private router: Router, private renderer: Renderer2, private authService: AuthService, public commentService: CommentService) { }

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

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  getChannelComments() {
    this.commentService.getComments(this.channel).subscribe((data) => {
      this.comments = data;
    })
  }

  getCommentResponse(comment: Comment, toogle = true) {
    if (!comment.comment_id) this.commentSelected = comment;
    this.commentService.getResponseCommentById(this.commentSelected!.id).subscribe((data) => {
      if (toogle) this.drawer.toggle()
      this.commentAnswers = data;
    })
  }

  saveComment(txt: string, commentId?: number) {
    const comment: INewComment = { content: txt, grp: this.channel, user_id: this.currentUser?.id! };
    if (commentId) comment.comment_id = commentId;

    this.commentService.createComment(comment).subscribe((data) => {
      this.getChannelComments()
      if (commentId) this.getCommentResponse(this.commentSelected!, false)
    })
  }

  deleteComment(comment: Comment) {
    this.commentService.deleteComment(comment.id).subscribe(() => {
      this.getChannelComments()
      this.drawer.close()
    })
  }

  updateComment(comment: Comment, response: boolean = false) {
    const dialogRef = this.dialog.open(ChatCommentUpdateComponent, {
      width: '70vw',
      data: { commentToUpdate: comment }
    });
    dialogRef.afterClosed().subscribe((updatedComment: Comment) => {
      if (updatedComment) {
        if (response) {
          this.getCommentResponse(updatedComment, false);
        }

        this.getChannelComments();
      }
    });
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

  scrollToBottom() {
    setTimeout(() => {
      this.renderer.setProperty(this.commentsList.nativeElement, 'scrollTop', this.commentsList.nativeElement.scrollHeight);
    }, 1)
  }
}
