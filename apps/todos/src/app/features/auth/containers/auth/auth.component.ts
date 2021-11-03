import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  UserLoginRequest,
  UserLogoutRequest,
} from '@learning-workspace/api-interfaces';
import { ApiService, AuthService } from '../../../../core/services';
import { User } from '@learning-workspace/api-interfaces';

@Component({
  selector: 'learning-workspace-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public user: User | null | undefined;
  public isOpenAuthForm = false;
  public isLoggedIn = false;

  private subscription = new Subscription();

  constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('AuthComponent');
  }

  public openAuthForm(): void {
    if (this.isLoggedIn) {
      this.userLogoutSubscription();
      return;
    }

    this.isOpenAuthForm = !this.isOpenAuthForm;
  }

  public afterCloseAuthForm(user: UserLoginRequest): void {
    this.isOpenAuthForm = false;
    this.userLoginSubscription(user);
  }

  private userRegisterSubscription(): void {
    this.subscription.add(
      this.apiService
        .register({
          email: 'yurchenko.stanislav@ukr.net',
          password: '284767Abc',
          name: 'stas',
        })
        .subscribe((user) => {
          console.log('user', user);
          this.user = user;
        })
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
        };
        this.authService.saveUser(data);
      })
    );
  }

  private userLogoutSubscription(): void {
    if (!this.user) return;
    this.subscription.add(
      this.apiService.logout({ id: this.user?.id }).subscribe((user) => {
        this.user = null;
        this.isLoggedIn = false;
        this.authService.removeUser();
      })
    );
  }
}
