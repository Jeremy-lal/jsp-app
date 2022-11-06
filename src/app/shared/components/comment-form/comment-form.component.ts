import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'comment-form',
  templateUrl: 'comment-form.component.html',
  styleUrls: ['comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() channel: string = "Commun"
  constructor() { }

  ngOnInit() { }
}
