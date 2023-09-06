import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignedDocPage } from './signed-doc.page';

const routes: Routes = [
  {
    path: '',
    component: SignedDocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignedDocPageRoutingModule {}
