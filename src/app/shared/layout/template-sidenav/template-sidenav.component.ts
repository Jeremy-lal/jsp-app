import { IUser } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'template-sidenav',
  templateUrl: 'template-sidenav.component.html',
  styleUrls: ['template-sidenav.component.scss'],
})
export class TemplateSidenavComponent implements OnInit {
  @Input() padding = false;
  chatSelected = false;

  isAdmin = false;
  currentUser!: IUser | undefined;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    setTimeout(() => {
      this.isAdmin = this.authService.isAdmin;
      this.currentUser = this.authService.currentUser;
    }, 200)
  }

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
    this.authService.currentUser = undefined;
    this.router.navigateByUrl('/login');
  }

  @ViewChild('sidenav') sidenav!: MatDrawer;
  // Add any other necessary properties and methods for your component

  toggleSidenav() {
    this.sidenav.toggle();
  }

}
