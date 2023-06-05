import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pedidos',
    pathMatch: 'full'
  },
  // {
  //   path: 'estoque',
  //   loadChildren: () => import('./pages/estoque/estoque/estoque.module').then( m => m.EstoquePageModule)
  // },
  // {
  //   path: 'estoque/:id',
  //   loadChildren: () => import('./pages/estoque/info-produto/info-produto.module').then( m => m.InfoProdutoPageModule)
  // },
  // {
  //   path: 'pedidos',
  //   loadChildren: () => import('./pages/pedidos/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  // },
  // {
  //   path: 'financas',
  //   loadChildren: () => import('./pages/financas/financas/financas.module').then( m => m.FinancasPageModule)
  // },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'listaprodutos',
    loadChildren: () => import('./pages/pedidos/listaprodutos/listaprodutos.module').then( m => m.ListaprodutosPageModule)
  },
  {
    path: 'criar-produto',
    loadChildren: () => import('./pages/estoque/criar-produto/criar-produto.module').then( m => m.CriarProdutoPageModule)
  },
  {
    path: 'confirmar',
    loadChildren: () => import('./pages/pedidos/confirmar/confirmar.module').then( m => m.ConfirmarPageModule)
  },
  // {
  //   path: 'historico',
  //   loadChildren: () => import('./pages/financas/historico/historico.module').then( m => m.HistoricoPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
