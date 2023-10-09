import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiometricRegistrationPageRoutingModule } from './biometric-registration-routing.module';

import { BiometricRegistrationPage } from './biometric-registration.page';
import { ComponentsModule } from '@components/components.module';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiometricRegistrationPageRoutingModule,
    ComponentsModule,
    DirectivesModule,
  ],
  declarations: [BiometricRegistrationPage],
})
export class BiometricRegistrationPageModule {}
