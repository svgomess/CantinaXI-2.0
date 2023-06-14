import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaldosPage } from './saldos.page';

const routes: Routes = [
  {
    path: '',
    component: SaldosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaldosPageRoutingModule {}
