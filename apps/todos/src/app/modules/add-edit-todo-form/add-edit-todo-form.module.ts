import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditTodoFormComponent } from './container';
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
export class AddEditTodoFormModule {}
