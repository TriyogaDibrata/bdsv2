import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDocPageRoutingModule } from './new-doc-routing.module';

import { NewDocPage } from './new-doc.page';
import { ComponentsModule } from '@components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewDocPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [NewDocPage],
})
export class NewDocPageModule {}
