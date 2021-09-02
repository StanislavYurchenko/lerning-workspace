import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditTodoFormComponent } from './add-edit-todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddEditTodoFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddEditTodoFormComponent
  ]
})
export class AddEditTodoFormModule { }
