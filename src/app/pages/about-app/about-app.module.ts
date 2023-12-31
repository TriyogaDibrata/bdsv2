import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutAppPageRoutingModule } from './about-app-routing.module';

import { AboutAppPage } from './about-app.page';
import { ComponentsModule } from '@components/components.module';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutAppPageRoutingModule,
    ComponentsModule,
    DirectivesModule,
  ],
  declarations: [AboutAppPage],
})
export class AboutAppPageModule {}
