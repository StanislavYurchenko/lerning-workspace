import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AddEditTodoFormModule } from './modules/add-edit-todo-form/add-edit-todo-form.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './modules/about/about.component';
import { TodoDetailsComponent } from './features/todo-details/todo-details.component';
import { TodosComponent } from './features/todos/todos.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';
import { StopPropagationDirective } from './directives/stop-propagation/stop-propagation.directive';

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
