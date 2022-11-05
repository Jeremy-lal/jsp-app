import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  channel = 'commun'

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((data) => {
      this.channel = data['channel']
    })
  }

}
