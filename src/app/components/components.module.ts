import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BackButtonComponent } from './back-button/back-button.component';
import { DocumentThubmnailComponent } from './document-thubmnail/document-thubmnail.component';
import { SheetMenuComponent } from './sheet-menu/sheet-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const _COMPONENTS = [
  BackButtonComponent,
  DocumentThubmnailComponent,
  SheetMenuComponent,
];

@NgModule({
  declarations: [_COMPONENTS],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  exports: [_COMPONENTS],
})
export class ComponentsModule {}
