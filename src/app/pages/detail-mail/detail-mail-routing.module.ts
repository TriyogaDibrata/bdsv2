import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailMailPage } from './detail-mail.page';

const routes: Routes = [
  {
    path: '',
    component: DetailMailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailMailPageRoutingModule {}
