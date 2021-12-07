import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  UserLoginRequest,
  UserRegisterRequest,
} from '@learning-workspace/api-interfaces';
import { UserApiService, AuthService } from '../../../../core/services';
import { User } from '@learning-workspace/api-interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'learning-workspace-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @ViewChild('modal') modalRef: TemplateRef<unknown>;

  public isLoggedIn = false;
  public userName = 'guest';
  public userId = '';
  public isLogin = false;

  private user: User | null;
  private subscription = new Subscription();

  constructor(
    private readonly UserApiService: UserApiService,
    private readonly modalService: NgbModal,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.initAuth();
  }

  public closeModal(): void {
    this.modalService.dismissAll();
  }

  public auth(): void {
    if (this.isLoggedIn) {
      this.userLogoutSubscription();
      return;
    }
    this.openModal();
  }

  public userRegister(user: UserRegisterRequest): void {
    this.userRegisterSubscription(user);
  }

  public userLogin(user: UserLoginRequest): void {
    this.userLoginSubscription(user);
  }

  private openModal(): void {
    this.modalService.open(this.modalRef, { centered: true }).result.then(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      () => {
        this.closeModal();
      }
    );
  }

  private initAuth() {
    if (!this.authService.isAuthenticated()) return;
    this.isLoggedIn = true;
    this.userName = this.authService.getUserName();
    this.userId = this.authService.getUserId();
  }

  private userRegisterSubscription(user: UserRegisterRequest): void {
    this.subscription.add(
      this.UserApiService
        .register({
          email: user.email,
          password: user.password,
          name: user.name,
        })
        .subscribe()
    );
  }

  private userLoginSubscription(user: UserLoginRequest): void {
    this.subscription.add(
      this.UserApiService
        .login({ ...user })
        .subscribe((user) => {
          if (!user) return;
          return this.loginAndAuthActions(user)
        })
    );
  }

  private userLogoutSubscription(): void {
    if (!this.isLoggedIn) return;
    this.subscription.add(
      this.UserApiService
        .logout({ id: this.userId })
        .subscribe(() => {
          this.user = null;
          this.isLoggedIn = false;
          this.userName = 'guest';
          this.authService.removeUser();
          this.router.navigate(['/']);
        })
    );
  }

  private loginAndAuthActions(user: User): void {
    if (!user) return;

    this.user = user;
    this.isLoggedIn = true;
    this.userName = user.name;
    this.userId = user.id
    const data = {
      name: user.name,
      token: user.token,
      id: user.id,
    };
    this.authService.saveUser(data);
    this.closeModal();
  }
}
