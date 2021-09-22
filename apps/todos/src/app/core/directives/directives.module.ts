import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StopPropagationDirective } from './stop-propagation';

const directives = [
  StopPropagationDirective,
]

@NgModule({
  declarations: directives,
  imports: [CommonModule],
  exports: directives,
})
export class DirectivesModule {}
