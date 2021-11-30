import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserLoginRequest } from '@learning-workspace/api-interfaces';
import { ValidationService } from '../../../../core/services';

@Component({
  selector: 'learning-workspace-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  @Output() formEvent = new EventEmitter<UserLoginRequest>();

  public form: FormGroup;
  public formLabel = 'Login';

  constructor(
    private readonly fb: FormBuilder,
    private readonly validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuild();
  }

  ngOnDestroy(): void {
    this.resetForm();
  }

  public resetForm(): void {
    this.form.reset();
  }

  public submitForm(): void {
    console.log(this.form);
    this.formEvent.emit(this.form.value);
  }

  private formBuild(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
