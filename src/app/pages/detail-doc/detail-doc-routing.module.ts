import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailDocPage } from './detail-doc.page';

const routes: Routes = [
  {
    path: '',
    component: DetailDocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailDocPageRoutingModule {}
