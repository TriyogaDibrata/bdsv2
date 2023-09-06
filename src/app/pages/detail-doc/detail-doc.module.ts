import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailDocPageRoutingModule } from './detail-doc-routing.module';

import { DetailDocPage } from './detail-doc.page';
import { ComponentsModule } from '@components/components.module';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailDocPageRoutingModule,
    ComponentsModule,
    DirectivesModule,
  ],
  declarations: [DetailDocPage],
})
export class DetailDocPageModule {}
