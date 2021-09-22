import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TodoDetailsRouterModule } from './todo-details-routing.module';

import { TodoDetailsComponent } from './containers';

@NgModule({
  declarations: [
    TodoDetailsComponent,
  ],
  imports: [
    CommonModule,
    TodoDetailsRouterModule,
    RouterModule,
  ],
})
export class TodoDetailsModule {}
