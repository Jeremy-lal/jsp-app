import { Router } from '@angular/router';
import { Component } from "@angular/core";

@Component({
  selector: 'template-sidenav',
  templateUrl: 'template-sidenav.component.html',
  styleUrls: ['template-sidenav.component.scss'],
})
export class TemplateSidenavComponent {
  drowpdown = false;
  chatSelected = false;

  constructor(private router: Router) { }

  goToChannel(channel: string) {
    this.router.navigate(['/user/chat'], {
      queryParams: {
        channel: channel,
      },
      queryParamsHandling: 'merge',
    });
  }

  logout() {
    localStorage.removeItem('JWT-TOKEN');
    // this.userService.currentUser = null;
    // this.router.navigateByUrl('/');
  }

}
