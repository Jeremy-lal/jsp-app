import { IUpdateComment } from './../../../core/models/comment.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comment } from 'src/app/core/models/comment.model';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentService } from 'src/app/core/services/comment-service';

@Component({
  selector: 'chat-comment-update',
  templateUrl: 'chat-comment-update.component.html',
  styleUrls: ['chat-comment-update.component.scss']
})

export class ChatCommentUpdateComponent {
  commentForm = this.fb.group({
    content: [this.data.commentToUpdate.content, [Validators.required, Validators.minLength(2)]],
  });

  constructor(private fb: FormBuilder, public commentService: CommentService,
    @Inject(MAT_DIALOG_DATA) private data: { commentToUpdate: Comment },
    private dialogRef: MatDialogRef<ChatCommentUpdateComponent>) { }

  updateComment() {
    if (this.commentForm.get('content')?.value !== null) {
      const commentUpdated = { ...this.data.commentToUpdate, ...this.commentForm.value };
      const commentFormated = this.filterCommentProperties(commentUpdated as Comment);
      this.commentService.updateComment(commentFormated).subscribe(() => {
        this.dialogRef.close(commentUpdated);
      });
    }
  }

  filterCommentProperties(comment: Comment): IUpdateComment {
    const { content, grp, user_id, comment_id, id } = comment;
    return { content, grp, user_id, comment_id, id };
  }
}
