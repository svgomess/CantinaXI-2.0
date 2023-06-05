import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoDados, ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-listaprodutos',
  templateUrl: './listaprodutos.page.html',
  styleUrls: ['./listaprodutos.page.scss'],
})
export class ListaprodutosPage implements OnInit {
  idCategoria: any = this.route.snapshot.paramMap.get('id');
  categoria: any;
  produtos: ProdutoDados[] = []; 

  constructor(
    private route:ActivatedRoute, 
    private produtoService:ProdutoService,
    private categoriaService:CategoriaService,
    public carrinhoService:CarrinhoService
    ) { }

  ngOnInit() {
    this.categoriaService.selecionarCategoria(this.idCategoria).subscribe((res) => {
      this.categoria = res.dados;
    }) 
    
    this.produtoService.listarProdutos().subscribe((res) => {
      res.dados.forEach(produto => {
        produto.FkCategoria === this.idCategoria ? this.produtos.push(produto) : null
      });
      console.log(this.produtos);
    })
  }
}
