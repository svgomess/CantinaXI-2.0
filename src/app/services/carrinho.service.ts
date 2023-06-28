import { CurrencyPipe, DecimalPipe, formatCurrency, formatNumber } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfirmarPage } from '../pages/pedidos/confirmar/confirmar.page';

export interface VendaDados {
  ValorTotal: number
  FkCliente: number
  FkFormaPagamento: number
  FkUsuario: string | null
  Produtos: any[]
}

@Injectable({
  providedIn: 'root'
})

export class CarrinhoService {
  itensCarrinho: any[] = [];
  private _options: any = { headers: new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'}) }

  constructor(
    private toastCtrl:ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private http:HttpClient) { }

  async adicionarCarrinho(produto: any){  

    let conteudo: any = {
      id: produto.Id,
      nome: produto.Nome,
      preco: produto.Preco,
      quantia: 1
    }

    produto.QtdEstoque--

    var checar = this.itensCarrinho.find(item => item.id === conteudo.id);

    if(!checar){
      this.itensCarrinho.push(conteudo)
    } else {
      var idItem = this.itensCarrinho.findIndex((obj => obj.id == checar.id))
      var itemAtual = this.itensCarrinho[idItem]

      itemAtual.quantia++
      itemAtual.preco = produto.Preco * itemAtual.quantia
    }

    const toast = await this.toastCtrl.create({
      message: `O item ${produto.Nome} foi adicionado ao carrinho`,
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();
  }

  async removerCarrinho(produto: any, index: number){

    if(produto.quantia > 1){
      var itemAtual = this.itensCarrinho[index]
      var precoBase = itemAtual.preco / itemAtual.quantia
      
      itemAtual.quantia--
      itemAtual.preco = precoBase * itemAtual.quantia
    } else {
      this.itensCarrinho.splice(index, 1);
    }

    const toast = await this.toastCtrl.create({
      message: `O item ${produto.nome} foi removido`,
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();
  }

  async limparCarrinho(){

    this.itensCarrinho.splice(0);

    const toast = await this.toastCtrl.create({
      message: `Todos os itens foram removidos`,
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();
  }

  async confirmarCarrinho(){
    let total: number = this.calcularTotal()

    const modal = await this.modalCtrl.create({
      component: ConfirmarPage,
      componentProps: { total: total },
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: ['modal-75']
    })

    await modal.present()
  }

  calcularTotal(){
    const valores: number[] = []

    this.itensCarrinho.forEach(item => {
      valores.push(+item.preco)
    });

    const total = valores.reduce((a: number, b: number) => {
      return a + b
    }, 0)
    
    return total
  }

  enviarVenda(venda: VendaDados, produtos: any){
    produtos.forEach(function(produto: any) {      
      console.log(produto);
    });

    return this.http.post<VendaDados>(`${environment.baseUrl}/venda/inserir`, venda, this._options).subscribe(res => (
      console.log(res)
    ));
  }
}
