import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './container';

@NgModule({
  declarations: [
    FooterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FooterComponent,
  ]
})
export class FooterModule {}
