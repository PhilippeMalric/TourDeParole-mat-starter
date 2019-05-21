import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'anms.menu.home' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'anms.menu.about' }
  },
  {
    path: 'features',
    component: FeaturesComponent,
    data: { title: 'anms.menu.features' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule {}
