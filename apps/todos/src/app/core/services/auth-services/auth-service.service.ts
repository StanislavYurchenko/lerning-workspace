import { Injectable } from '@angular/core';
import { LocalStorageService } from '..'

import { User } from '@learning-workspace/api-interfaces';

@Injectable()
export class AuthService {
  constructor(private localStorageService: LocalStorageService) {}

  public getAuthorizationToken(): string {
    const data = this.localStorageService.getItemParsed('user');
    return data?.token ? data.token : '';
  }

  public getUserName(): string {
    const data = this.localStorageService.getItemParsed('user');
    return data?.name ? data.name : '';
  }

  public saveUser(user: Partial<User>): void {
    this.localStorageService.setItem('user', user);
  }

  public removeUser(): void {
    this.localStorageService.removeItem('user');
  }

  public isAuthenticated(): boolean {
    const data = this.localStorageService.getItemParsed('user');
    return Boolean(data?.token)
  };
}
