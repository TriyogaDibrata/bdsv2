import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePassphrasePageRoutingModule } from './update-passphrase-routing.module';

import { UpdatePassphrasePage } from './update-passphrase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePassphrasePageRoutingModule
  ],
  declarations: [UpdatePassphrasePage]
})
export class UpdatePassphrasePageModule {}
