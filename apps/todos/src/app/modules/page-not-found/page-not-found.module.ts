import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { PageNotFoundRouterModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './container';

@NgModule({
  declarations: [
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    PageNotFoundRouterModule,
    RouterModule,
  ]
})
export class PageNotFoundModule { }
