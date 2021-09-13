import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosContainerComponent } from './containers';
import { TodoItemComponent } from './components';
import { AddEditTodoFormModule } from '../../modules';
import { RouterModule } from '@angular/router';
import { TodosRouterModule } from './todos-routing.module';


@NgModule({
  declarations: [TodosContainerComponent, TodoItemComponent],
  imports: [
    CommonModule,
    AddEditTodoFormModule,
    TodosRouterModule,
    RouterModule,
  ],
})
export class TodosModule {}
