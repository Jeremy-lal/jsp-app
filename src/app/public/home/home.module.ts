import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Route[] = [
  { path: "", component: HomeComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule { }
