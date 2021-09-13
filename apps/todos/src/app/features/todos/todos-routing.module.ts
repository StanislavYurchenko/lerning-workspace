import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { TodosContainerComponent } from './containers';

const routes: Route[] = [
  {
    path: '',
    component: TodosContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRouterModule {}
