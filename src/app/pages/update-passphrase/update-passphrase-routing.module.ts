import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePassphrasePage } from './update-passphrase.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePassphrasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePassphrasePageRoutingModule {}
