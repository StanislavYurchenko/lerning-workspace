import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  UserLoginRequest,
  UserLogoutRequest,
  UserRegisterRequest,
} from '@learning-workspace/api-interfaces';
import { ApiService, AuthService } from '../../../../core/services';
import { User } from '@learning-workspace/api-interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'learning-workspace-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public isOpenAuthForm = false;
  public isLoggedIn = false;
  public userName = 'guest';
  public userId = '';
  public isLogin = true;

  private user: User | null | undefined;
  private subscription = new Subscription();

  constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.initAuth();
  }

  public openAuthForm(): void {
    if (this.isLoggedIn) {
      this.userLogoutSubscription();
      return;
    }

    this.isOpenAuthForm = !this.isOpenAuthForm;
  }

  public userRegister(user: UserRegisterRequest): void {
    this.afterCloseAuthForm();
    this.userRegisterSubscription(user);
  }

  public userLogin(user: UserLoginRequest): void {
    this.afterCloseAuthForm();
    this.userLoginSubscription(user);
  }

  private afterCloseAuthForm(): void {
    this.isOpenAuthForm = false;
  }

  private initAuth() {
    if (!this.authService.isAuthenticated()) return;
    this.isLoggedIn = true;
    this.userName = this.authService.getUserName();
    this.userId = this.authService.getUserId();
  }

  private userRegisterSubscription(user: UserRegisterRequest): void {
    this.subscription.add(
      this.apiService
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
      this.apiService.login({ ...user }).subscribe((user) => {
        if (!user) return;

        this.user = user;
        this.isLoggedIn = true;
        const data = {
          name: user.name,
          token: user.token,
          id: user.id,
        };
        this.authService.saveUser(data);
      })
    );
  }

  private userLogoutSubscription(): void {
    if (!this.isLoggedIn) return;
    this.subscription.add(
      this.apiService.logout({ id: this.userId }).subscribe(() => {
        this.user = null;
        this.isLoggedIn = false;
        this.userName = 'guest';
        this.authService.removeUser();
        this.router.navigate(['/']);
      })
    );
  }
}
