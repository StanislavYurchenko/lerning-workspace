import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { TodosComponent } from './containers';

const routes: Route[] = [
  {
    path: '',
    component: TodosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRouterModule {}
