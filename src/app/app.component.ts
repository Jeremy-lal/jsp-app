import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  emptyTemplate = false;
  padding = true;

  constructor(private router: Router, private route: ActivatedRoute) { }
  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData;
  // }

  ngOnInit() {
    this.getNavigateInformations()
  }

  getNavigateInformations() {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        tap((event) => this.padding = !event['url'].includes('chat')),
        map(() => this.route),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      ).subscribe(data => {
        if (data['templateEmpty']) {
          this.emptyTemplate = true;
        } else {
          this.emptyTemplate = false;
        }
      })
  }
}
