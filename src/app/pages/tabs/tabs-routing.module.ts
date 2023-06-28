import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'pedidos',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/pedidos/pedidos/pedidos.module').then(m => m.PedidosPageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('src/app/pages/pedidos/listaprodutos/listaprodutos.module').then(m => m.ListaprodutosPageModule)
          },
        ]
      },
      {
        path: 'financas',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/financas/financas/financas.module').then(m => m.FinancasPageModule)
          },
          {
            path: 'historico',
            loadChildren: () => import('src/app/pages/financas/historico/historico.module').then(m => m.HistoricoPageModule)
          },
          {
            path: 'mensalistas',
            loadChildren: () => import('src/app/pages/financas/mensalistas/mensalistas.module').then(m => m.MensalistasPageModule)
          },
          {
            path: 'saldos',
            loadChildren: () => import('src/app/pages/financas/saldos/saldos.module').then(m => m.SaldosPageModule)
          },
        ]
      },
      {
        path: 'estoque',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/estoque/estoque/estoque.module').then(m => m.EstoquePageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('src/app/pages/estoque/info-produto/info-produto.module').then( m => m.InfoProdutoPageModule)
          }
        ]
      },
      {
        path: 'vendedores',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/vendedores/vendedores.module').then(m => m.VendedoresPageModule)
          },
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/pedidos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
