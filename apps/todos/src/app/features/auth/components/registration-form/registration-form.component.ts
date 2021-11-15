import { AfterViewInit, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserLoginRequest } from '@learning-workspace/api-interfaces';
import { ValidationService } from '../../../../core/services';

@Component({
  selector: 'learning-workspace-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit, AfterViewInit {
  @Output() registerFormEvent = new EventEmitter<UserLoginRequest>();

  @ViewChild('form') formRef: TemplateRef<unknown>;

  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public formLabel = 'Registration';

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal,
    private readonly validationService: ValidationService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.registerFormBuild();
  }

  ngAfterViewInit(): void {
    this.openForm(this.formRef);
  }

  private registerFormBuild(): FormGroup {
    const form = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
      }
    );

    form
      .get('confirmPassword')
      ?.setValidators([
        Validators.required,
        Validators.minLength(6),
        this.validationService.passwordConfirmValidator(form),
      ]);

    return form;
  }

  public openForm(content: TemplateRef<unknown>): void {
    this.modalService.open(content, { centered: true }).result.then(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      () => {
        this.registerFormEvent.emit();
        this.closeForm();
      }
    );
  }

  public closeForm(): void {
    this.registerForm.reset();
    this.modalService.dismissAll();
  }

  public submitRegisterForm(): void {
    this.registerFormEvent.emit(this.registerForm.value);
    this.closeForm();
  }
}
