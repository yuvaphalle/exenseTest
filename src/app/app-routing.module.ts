import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NameViewComponent } from './name-view/name-view.component';
import { SortedViewComponent } from './sorted-view/sorted-view.component';
import { AgeViewComponent } from './age-view/age-view.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'nameview',
    component: NameViewComponent
  },
  {
    path:'sortedview',
    component: SortedViewComponent
  },
  {
    path:'ageview',
    component: AgeViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
