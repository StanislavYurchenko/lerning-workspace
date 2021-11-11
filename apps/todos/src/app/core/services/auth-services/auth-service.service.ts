import { Injectable } from '@angular/core';
import { LocalStorageService } from '..'

import { User } from '@learning-workspace/api-interfaces';

@Injectable()
export class AuthService {
  constructor(private localStorageService: LocalStorageService) {}

  public getAuthorizationToken(): string {
    return this.getAuthorizationTokenFromLocalStore();
  }

  public getUserName(): string {
    return this.getUserNameFromLocalStore();
  }

  public getUserId(): string {
    return this.getUserIdFromLocalStore();
  }

  public saveUser(user: Partial<User>): boolean {
    this.saveUserFromLocalStore(user);
    return true;
  }

  public removeUser(): boolean {
    this.removeUserFromLocalStore();
    return true;
  }

  public isAuthenticated(): boolean {
    return this.isAuthenticatedFromLocalStore();
  }

  private getAuthorizationTokenFromLocalStore(): string {
    const data = this.localStorageService.getItemParsed('user');
    return data?.token ? data.token : '';
  }

  private getUserNameFromLocalStore(): string {
    const data = this.localStorageService.getItemParsed('user');
    return data?.name ? data.name : '';
  }

  private getUserIdFromLocalStore(): string {
    const data = this.localStorageService.getItemParsed('id');
    return data?.id ? data.id : '';
  }

  private saveUserFromLocalStore(user: Partial<User>): void {
    this.localStorageService.setItem('user', user);
  }

  private removeUserFromLocalStore(): void {
    this.localStorageService.removeItem('user');
  }

  private isAuthenticatedFromLocalStore(): boolean {
    const data = this.localStorageService.getItemParsed('user');
    return Boolean(data?.token);
  }
}
