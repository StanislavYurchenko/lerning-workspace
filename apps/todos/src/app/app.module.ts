import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderModule, FooterModule } from './modules';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LocalStorageService, AuthService, UserApiService, TodoApiService, ValidationService} from './core/services';
import { AuthInterceptor } from './core/interceptors'

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    HeaderModule,
    FooterModule,
  ],
  providers: [
    LocalStorageService,
    AuthService,
    UserApiService,
    TodoApiService,
    ValidationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
