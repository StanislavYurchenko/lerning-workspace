import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StopPropagationDirective } from '../../core/directives';

import { AddEditTodoFormModule } from '../../modules';
import { TodosRouterModule } from './todos-routing.module';

import { TodosContainerComponent } from './containers';
import { TodoItemComponent } from './components';

@NgModule({
  declarations: [
    TodosContainerComponent,
    TodoItemComponent,
    StopPropagationDirective,
  ],
  imports: [
    CommonModule,
    AddEditTodoFormModule,
    TodosRouterModule,
    RouterModule,
  ],
})
export class TodosModule {}
