import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { LocalStorageService } from './core/services';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule, FooterModule } from './modules';

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
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
