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
  AddEditTodoFormModule,
} from './modules';
import { TodoDetailsComponent, TodosComponent } from './features';

import { StopPropagationDirective } from './core/directives';
import { TodoItemComponent } from './features/todo-item/todo-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TodoDetailsComponent,
    TodosComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    StopPropagationDirective,
    TodoItemComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AddEditTodoFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
