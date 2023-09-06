import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignedDocPageRoutingModule } from './signed-doc-routing.module';

import { SignedDocPage } from './signed-doc.page';
import { ComponentsModule } from '@components/components.module';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignedDocPageRoutingModule,
    ComponentsModule,
    DirectivesModule,
  ],
  declarations: [SignedDocPage],
})
export class SignedDocPageModule {}
