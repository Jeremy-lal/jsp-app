import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'comment-form',
  templateUrl: 'comment-form.component.html',
  styleUrls: ['comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() channel: string = "Commun";
  @Output() saveComment = new EventEmitter();
  comment = '';
  constructor() { }

  ngOnInit() { }

  save() {
    this.saveComment.emit(this.comment);
    this.comment = '';
  }
}
