import { Injectable } from '@angular/core';
import { StorageService } from '..'

import { User } from '@learning-workspace/api-interfaces';

@Injectable()
export class UserService {
  constructor(private storageService: StorageService) {}

  public getUserName(): string {
    const data = this.storageService.getItemParsed('user');
    return data?.name ? data.name : '';
  }

  public getUserId(): string {
    const data = this.storageService.getItemParsed('id');
    return data?.id ? data.id : '';
  }

  public saveUser(user: Partial<User>): boolean {
    this.storageService.setItem('user', user);
    return true;
  }

  public removeUser(): boolean {
    this.storageService.removeItem('user');
    return true;
  }

  public getUser(): string {
    const data = this.storageService.getItemParsed('user');
    return data?.name ? data.name : '';
  }
}
