import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DirectivesModule } from '../../core/directives';

import { AddEditTodoFormModule } from '../../modules';
import { SearchModule } from '../../modules';
import { TodosRouterModule } from './todos-routing.module';

import { TodosComponent } from './containers';
import { TodoItemComponent } from './components';

@NgModule({
  declarations: [
    TodosComponent,
    TodoItemComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    AddEditTodoFormModule,
    SearchModule,
    TodosRouterModule,
    RouterModule,
  ],
})
export class TodosModule {}
