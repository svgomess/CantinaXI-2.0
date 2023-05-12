import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaprodutosPage } from './listaprodutos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaprodutosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaprodutosPageRoutingModule {}
