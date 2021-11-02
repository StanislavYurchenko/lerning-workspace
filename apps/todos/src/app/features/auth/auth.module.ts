import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './containers';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

@NgModule({
  declarations: [AuthComponent, AuthFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AuthComponent],
})
export class AuthModule {}
