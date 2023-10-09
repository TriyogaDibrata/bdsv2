import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiometricRegistrationPage } from './biometric-registration.page';

const routes: Routes = [
  {
    path: '',
    component: BiometricRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiometricRegistrationPageRoutingModule {}
