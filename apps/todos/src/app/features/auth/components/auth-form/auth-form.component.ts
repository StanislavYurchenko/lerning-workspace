import { AfterViewInit, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserLoginRequest } from '@learning-workspace/api-interfaces';

@Component({
  selector: 'learning-workspace-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, AfterViewInit {
  @Output() addEditFormEvent = new EventEmitter<UserLoginRequest>();

  public authForm: FormGroup;

  @ViewChild('login') loginContent: TemplateRef<unknown>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.authForm = this.authFormBuild();
  }

  ngAfterViewInit(): void {
    this.openAuthForm(this.loginContent);
  }

  private authFormBuild(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public openAuthForm(content: TemplateRef<unknown>): void {
    this.modalService.open(content, { centered: true }).result.then(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      () => {
        this.addEditFormEvent.emit();
        this.closeAuthForm();
      }
    );
  }

  public closeAuthForm(): void {
    this.authForm.reset();
    this.modalService.dismissAll();
  }

  public submitAuthForm(): void {
    this.addEditFormEvent.emit(this.authForm.value);
    this.closeAuthForm();
  }
}
