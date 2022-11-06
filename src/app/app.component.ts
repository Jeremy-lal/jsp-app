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
    console.log(window.location.pathname);

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        tap(() => this.padding = !window.location.pathname.includes('chat')),
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
