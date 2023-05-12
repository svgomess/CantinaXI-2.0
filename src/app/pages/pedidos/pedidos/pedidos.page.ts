import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { CarrinhoPage } from 'src/app/pages/pedidos/carrinho/carrinho.page'
import { CategoriaDados, CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  categorias: CategoriaDados[] = [];
  constructor(
    private categoriaService:CategoriaService,
    private modalCtrl: ModalController, 
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.carregarCategorias();
  }

  async carregarCategorias(){
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      spinner: 'circles'
    });
    await loading.present();

    this.categoriaService.listarCategorias().subscribe((res) => {
      loading.dismiss();
      this.categorias.push(...res.dados);
      console.log(this.categorias);
    })
  }

  async mostrarCarrinho(){
    const modal = await this.modalCtrl.create({
      component: CarrinhoPage,
      breakpoints: [0.5, 1],
      initialBreakpoint: 0.5,
      handle: false
    })
    await modal.present()
    console.log("carrinho")
  }

}
