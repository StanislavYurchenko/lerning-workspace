import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthComponent } from './containers';
import { RegistrationFormComponent, LoginFormComponent } from './components';

@NgModule({
  declarations: [
    AuthComponent,
    RegistrationFormComponent,
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
