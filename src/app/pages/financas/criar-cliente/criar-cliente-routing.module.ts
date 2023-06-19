import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarClientePage } from './criar-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: CriarClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarClientePageRoutingModule {}
