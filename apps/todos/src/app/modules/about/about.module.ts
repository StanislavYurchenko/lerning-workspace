import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutRouterModule } from './about-routing.module';

import { AboutComponent } from './containers';

@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AboutRouterModule,
  ]
})
export class AboutModule { }
