import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarcodeScannerPageRoutingModule } from './barcode-scanner-routing.module';

import { BarcodeScannerPage } from './barcode-scanner.page';
import { ComponentsModule } from '@components/components.module';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarcodeScannerPageRoutingModule,
    ComponentsModule,
    DirectivesModule,
  ],
  declarations: [BarcodeScannerPage],
})
export class BarcodeScannerPageModule {}
