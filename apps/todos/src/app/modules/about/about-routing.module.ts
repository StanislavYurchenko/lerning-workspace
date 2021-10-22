import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { AboutComponent } from './about.component';

const routes: Route[] = [
  {
    path: '',
    component: AboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRouterModule {}
