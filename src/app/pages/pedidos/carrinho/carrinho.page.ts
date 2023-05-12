import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarrinhoService } from 'src/app/services/carrinho.service';

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

}
