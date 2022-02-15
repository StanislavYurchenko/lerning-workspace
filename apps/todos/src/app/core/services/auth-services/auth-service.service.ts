import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StorageService } from '..'
import {
  User,
  UserResponse,
  UserLoginRequest,
  UserRegisterRequest,
  UserLogoutRequest,
  UserLogoutResponse,
  UserLogoutMessage,
} from '@learning-workspace/api-interfaces';

@Injectable()
export class AuthService {
  constructor(
    private storageService: StorageService,
    private readonly http: HttpClient,
  ) {}

  public getAuthorizationToken(): string {
    const data = this.storageService.getItemParsed('user');
    return data?.token ? data.token : '';
  }

  public isAuthenticated(): boolean {
    const data = this.storageService.getItemParsed('user');
    return Boolean(data?.token);
  }

  public register(body: UserRegisterRequest): Observable<User | undefined> {
    return this.http
      .post<UserResponse>('/api/user/register', body)
      .pipe(map((res) => res.data));
  }

  public login(body: UserLoginRequest): Observable<User | undefined> {
    return this.http
      .post<UserResponse>('/api/user/login', body)
      .pipe(map((res) => {
        return res.data
      }));
  }

  public logout(
    body: UserLogoutRequest
  ): Observable<UserLogoutMessage | undefined> {
    return this.http
      .post<UserLogoutResponse>('/api/user/login', body)
      .pipe(map((res) => res.data));
  }
}
