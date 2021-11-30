import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserRegisterRequest } from '@learning-workspace/api-interfaces';
import { ValidationService } from '../../../../core/services';

@Component({
  selector: 'learning-workspace-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  @Output() formEvent = new EventEmitter<UserRegisterRequest>();

  public form: FormGroup;
  public formLabel = 'Registration';

  constructor(
    private readonly fb: FormBuilder,
    private readonly validationService: ValidationService,
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
    this.formEvent.emit(this.form.value);
  }

  private formBuild(): FormGroup {
    const form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    });

    form
      .get('confirmPassword')
      ?.setValidators([
        Validators.required,
        Validators.minLength(6),
        this.validationService.passwordConfirmValidator(form),
      ]);

    return form;
  }
}
