import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddEditTodoFormComponent } from './add-edit-todo-form.component';

@NgModule({
  declarations: [
    AddEditTodoFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddEditTodoFormComponent,
  ]
})
export class AddEditTodoFormModule {}
