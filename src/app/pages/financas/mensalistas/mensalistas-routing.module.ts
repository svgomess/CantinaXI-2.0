import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensalistasPage } from './mensalistas.page';

const routes: Routes = [
  {
    path: '',
    component: MensalistasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensalistasPageRoutingModule {}
