import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InboxPageRoutingModule } from './inbox-routing.module';

import { InboxPage } from './inbox.page';
import { ComponentsModule } from '@components/components.module';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InboxPageRoutingModule,
    ComponentsModule,
    DirectivesModule,
  ],
  declarations: [InboxPage],
})
export class InboxPageModule {}
