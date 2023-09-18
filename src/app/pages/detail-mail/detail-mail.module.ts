import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailMailPageRoutingModule } from './detail-mail-routing.module';

import { DetailMailPage } from './detail-mail.page';
import { ComponentsModule } from '@components/components.module';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailMailPageRoutingModule,
    ComponentsModule,
    DirectivesModule,
  ],
  declarations: [DetailMailPage],
})
export class DetailMailPageModule {}
