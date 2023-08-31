import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrokenImageDirective } from './broken-image.directive';

const _DIRECTIVES = [BrokenImageDirective];

@NgModule({
  declarations: [_DIRECTIVES],
  imports: [CommonModule],
  exports: [_DIRECTIVES],
})
export class DirectivesModule {}
