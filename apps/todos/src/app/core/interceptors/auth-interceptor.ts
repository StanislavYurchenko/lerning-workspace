import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserService, AuthService } from '../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthorizationToken();

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });

    return next.handle(authReq).pipe(
      catchError((error: any) => {
        if (error.status === 403) {
          this.userService.removeUser();
          this.router.navigate(['/']);
        }
        return of(error);
      })
    );
  }
}
