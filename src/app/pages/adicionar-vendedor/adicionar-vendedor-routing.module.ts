import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarVendedorPage } from './adicionar-vendedor.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarVendedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarVendedorPageRoutingModule {}
