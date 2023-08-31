import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BackButtonComponent } from './back-button/back-button.component';
import { DocumentThubmnailComponent } from './document-thubmnail/document-thubmnail.component';

const _COMPONENTS = [BackButtonComponent, DocumentThubmnailComponent];

@NgModule({
  declarations: [_COMPONENTS],
  imports: [CommonModule, IonicModule],
  exports: [_COMPONENTS],
})
export class ComponentsModule {}
