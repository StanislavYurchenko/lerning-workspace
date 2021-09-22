import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { TodoDetailsComponent } from './containers';

const routes: Route[] = [
  {
    path: '',
    component: TodoDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoDetailsRouterModule {}
