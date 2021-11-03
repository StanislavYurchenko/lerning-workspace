import { Injectable } from '@angular/core';
import { LocalStorageService } from '..'

import { User } from '@learning-workspace/api-interfaces';
import { partition } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private localStorageService: LocalStorageService) {}

  getAuthorizationToken(): string {
    const data = this.localStorageService.getItemParsed('user');
    return data?.token ? data.token : '';
  }

  getUserName(): string {
    const data = this.localStorageService.getItemParsed('user');
    return data?.name ? data.name : '';
  }

  saveUser(user: Partial<User>): void {
    this.localStorageService.setItem('user', user);
  }

  removeUser(): void {
    this.localStorageService.removeItem('user')
  }
}
