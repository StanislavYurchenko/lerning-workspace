import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../../features/auth/auth.module';
import { AppRoutingModule } from '../../app-routing.module';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    RouterModule,
    AuthModule,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule {}
