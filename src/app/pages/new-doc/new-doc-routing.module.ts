import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewDocPage } from './new-doc.page';

const routes: Routes = [
  {
    path: '',
    component: NewDocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewDocPageRoutingModule {}
