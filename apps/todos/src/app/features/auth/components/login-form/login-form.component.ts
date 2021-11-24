import { AfterViewInit, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserLoginRequest } from '@learning-workspace/api-interfaces';
import { ValidationService } from '../../../../core/services';

@Component({
  selector: 'learning-workspace-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, AfterViewInit {
  @Output() loginFormEvent = new EventEmitter<UserLoginRequest>();

  @ViewChild('form') formRef: TemplateRef<unknown>;

  public loginForm: FormGroup;
  public formLabel = 'Login';

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal,
    private readonly validationService: ValidationService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.loginFormBuild();
  }

  ngAfterViewInit(): void {
    this.openForm(this.formRef);
  }

  private loginFormBuild(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public openForm(content: TemplateRef<unknown>): void {
    this.modalService.open(content, { centered: true }).result.then(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      () => {
        this.closeForm();
      }
    );
  }

  public closeForm(): void {
    this.loginForm.reset();
    this.modalService.dismissAll();
  }

  public submitLoginForm(): void {
    this.loginFormEvent.emit(this.loginForm.value);
    this.closeForm();
  }
}
