import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendedoresPage } from './vendedores.page';

const routes: Routes = [
  {
    path: '',
    component: VendedoresPage
  },
  {
    path: 'adicionar-vendedor',
    loadChildren: () => import('../adicionar-vendedor/adicionar-vendedor.module').then( m => m.AdicionarVendedorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendedoresPageRoutingModule {}
