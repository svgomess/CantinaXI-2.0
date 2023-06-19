import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { CategoriaDados, CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoDados, ProdutoService } from 'src/app/services/produto.service';
import { CriarProdutoPage } from '../criar-produto/criar-produto.page';

export interface ListagemDados {
  Nome: string,
  Preco: string,
  Estoque: number,
  Categoria: string
}

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.page.html',
  styleUrls: ['./estoque.page.scss'],
})
export class EstoquePage implements OnInit {
  produtos: ProdutoDados[] = [];
  categorias: CategoriaDados[] = [];

  listagem: ListagemDados[] = [];

  constructor(
    private produtoService: ProdutoService,
    private modalCtrl: ModalController, 
    private categoriaService: CategoriaService, 
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.carregarProdutos();
  }

  async carregarProdutos(){
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      spinner: 'circles'
    });
    await loading.present();

    this.categoriaService.listarCategorias().subscribe((res) => {
      this.categorias.push(...res.dados);
      console.log(this.categorias);
    })

    this.produtoService.listarProdutos().subscribe((res) => {
      loading.dismiss();
      this.produtos.push(...res.dados);
      console.log(this.produtos)
    })
  }

  async criarProduto(){
    const modal = await this.modalCtrl.create({
      component: CriarProdutoPage,
      componentProps: { value: 123 },
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: ['modal-75']
    })
    await modal.present()
    console.log("inserir novo produto")
  }

  resetarPagina(){
    window.location.reload()
  }
}
