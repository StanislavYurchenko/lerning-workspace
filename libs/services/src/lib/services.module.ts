import { NgModule } from '@angular/core';

import { ApiServiceModule } from './api-services';

const modules = [
  ApiServiceModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class ServicesModule {}
