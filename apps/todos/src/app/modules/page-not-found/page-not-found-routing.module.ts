import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { PageNotFoundComponent } from './container';

const routes: Route[] = [
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageNotFoundRouterModule {}
