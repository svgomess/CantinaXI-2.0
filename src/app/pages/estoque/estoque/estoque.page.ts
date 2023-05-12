import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CategoriaDados, CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoDados, ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.page.html',
  styleUrls: ['./estoque.page.scss'],
})
export class EstoquePage implements OnInit {
  produtos: ProdutoDados[] = [];
  categorias: CategoriaDados[] = [];

  constructor(
    private produtoService: ProdutoService,
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
      console.log(res.dados[1].Id);
    })
  }

}
