import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { TodoComponent } from './todo/todo.component';
import { TodosComponent } from './todos/todos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// import { ServicesModule } from '@learning-workspace/services';
// import { ApiService } from 'libs/services/src/lib/api-services/api-services.service';

@NgModule({
  declarations: [AppComponent, AboutComponent, TodoComponent, TodosComponent, PageNotFoundComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
