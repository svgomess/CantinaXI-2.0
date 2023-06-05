import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ConfirmarPage } from '../confirmar/confirmar.page';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  itensCarrinho: any = this.carrinhoService.itensCarrinho

  constructor(
    private modalCtrl: ModalController,
    public carrinhoService: CarrinhoService) { }

  ngOnInit() {
    console.log(this.carrinhoService.itensCarrinho)
  }

  fechar() {
    this.modalCtrl.dismiss()
  }

  async mostrarConfirmacao(){
    const modal = await this.modalCtrl.create({
      component: ConfirmarPage,
      componentProps: { value: 123 },
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: ['venda-modal']
    })
    await modal.present()
    console.log("inserir novo produto")
  }

}
