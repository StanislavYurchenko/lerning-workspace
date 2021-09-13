import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  AboutComponent,
  PageNotFoundComponent,
  HeaderComponent,
  FooterComponent,
} from './modules';
import { TodoDetailsComponent, TodosModule } from './features';

import { StopPropagationDirective } from './core/directives';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TodoDetailsComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    StopPropagationDirective,

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    TodosModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
