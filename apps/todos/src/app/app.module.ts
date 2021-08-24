import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
// import { ServicesModule } from '@learning-workspace/services';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// import { ApiService } from 'libs/services/src/lib/api-services/api-services.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
