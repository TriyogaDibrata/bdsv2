import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePassphrasePageRoutingModule } from './update-passphrase-routing.module';

import { UpdatePassphrasePage } from './update-passphrase.page';
import { ComponentsModule } from '@components/components.module';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePassphrasePageRoutingModule,
    ComponentsModule,
    DirectivesModule,
  ],
  declarations: [UpdatePassphrasePage],
})
export class UpdatePassphrasePageModule {}
