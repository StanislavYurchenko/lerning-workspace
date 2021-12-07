import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  UserResponse,
  UserLoginRequest,
  UserRegisterRequest,
  UserLogoutRequest,
  UserLogoutResponse,
  UserLogoutMessage,
  User,
} from '@learning-workspace/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserApiService {
  constructor(private readonly http: HttpClient) {}

  register(body: UserRegisterRequest): Observable<User | undefined> {
    return this.http
      .post<UserResponse>('/api/user/register', body)
      .pipe(map((res) => res.data));
  }

  login(body: UserLoginRequest): Observable<User | undefined> {
    return this.http
      .post<UserResponse>('/api/user/login', body)
      .pipe(map((res) => res.data));
  }

  logout(body: UserLogoutRequest): Observable<UserLogoutMessage | undefined> {
    return this.http
      .post<UserLogoutResponse>('/api/user/login', body)
      .pipe(map((res) => res.data));
  }
}
