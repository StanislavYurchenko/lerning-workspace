import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api-services.service';

@NgModule({
  imports: [CommonModule],
  providers: [ApiService],
})
export class ApiServiceModule {}
