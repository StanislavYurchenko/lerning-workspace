import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchNewComponent } from './search-new.component';



@NgModule({
  declarations: [
    SearchNewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    SearchNewComponent,
  ]
})
export class SearchNewModule { }
