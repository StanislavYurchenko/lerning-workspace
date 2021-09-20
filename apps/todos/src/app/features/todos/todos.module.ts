import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DirectivesModule } from '../../core/directives/directives.module';

import { AddEditTodoFormModule } from '../../modules';
import { TodosRouterModule } from './todos-routing.module';

import { TodosContainerComponent } from './containers';
import { TodoItemComponent } from './components';

@NgModule({
  declarations: [
    TodosContainerComponent,
    TodoItemComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    AddEditTodoFormModule,
    TodosRouterModule,
    RouterModule,
  ],
})
export class TodosModule {}
