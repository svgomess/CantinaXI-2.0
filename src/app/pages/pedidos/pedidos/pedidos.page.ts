import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
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
    private alertCtrl: AlertController,
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
      this.categorias.splice(0)
      this.categorias.push(...res.dados);
      console.log(this.categorias);
    })
  }

  async atualizarCategorias(data: any){
    this.categorias.push(data)
    console.log(this.categorias)
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

  async criarCategoriaAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Criar categoria',
      inputs: [
        {  
          name: 'Nome',  
          type: 'text',  
          placeholder: 'Nome da categoria'
        }
      ],
      buttons: [  
        {  
          text: 'CANCELAR',  
          role: 'cancel',  
          handler: () => {  
            console.log('Cancelado');  
          }  
        },  
        {  
          text: 'CONFIRMAR',  
          handler: async (data: any) => { 
            if(data.Nome != '') {this.categoriaService.adicionarCategoria(data); this.ngOnInit()}
          }
        }  
      ],
    });

    await alert.present();
  }

}
