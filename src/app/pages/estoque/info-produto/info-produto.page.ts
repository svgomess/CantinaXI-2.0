import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-info-produto',
  templateUrl: './info-produto.page.html',
  styleUrls: ['./info-produto.page.scss'],
})
export class InfoProdutoPage implements OnInit {
  produto: any = null;
  constructor(
    private route:ActivatedRoute, 
    private produtoService:ProdutoService,
    private categoriaService:CategoriaService) { }

  ngOnInit() {
    const id: any = this.route.snapshot.paramMap.get('id');

    this.produtoService.mostrarProduto(id).subscribe((res) => {
      this.produto = res.dados;
      console.log(this.produto);

      let categoriaProduto = this.categoriaService.selecionarCategoria(this.produto.Id)
      console.log(categoriaProduto);
    })
  }

}
