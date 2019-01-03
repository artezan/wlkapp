import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesDirective } from './directives.directive';

@NgModule({
  declarations: [DirectivesDirective],
  exports: [DirectivesDirective],
  imports: [CommonModule],
})
export class DirectivesModule {}
