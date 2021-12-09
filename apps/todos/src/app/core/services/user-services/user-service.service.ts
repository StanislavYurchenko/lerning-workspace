import { Injectable } from '@angular/core';
import { LocalStorageService } from '..'

import { User } from '@learning-workspace/api-interfaces';

@Injectable()
export class UserService {
  constructor(private localStorageService: LocalStorageService) {}

  public getUserName(): string {
    const data = this.localStorageService.getItemParsed('user');
    return data?.name ? data.name : '';
  }

  public getUserId(): string {
    const data = this.localStorageService.getItemParsed('id');
    return data?.id ? data.id : '';
  }

  public saveUser(user: Partial<User>): boolean {
    this.localStorageService.setItem('user', user);
    return true;
  }

  public removeUser(): boolean {
    this.localStorageService.removeItem('user');
    return true;
  }
}
