import { CurrencyPipe, DecimalPipe, formatCurrency, formatNumber } from '@angular/common';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  itensCarrinho: any[] = [];

  constructor(
    private toastCtrl:ToastController,
    private alertCtrl: AlertController) { }

  async adicionarCarrinho(produto: any){  
    let conteudo: any = {
      id: produto.Id,
      nome: produto.Nome,
      preco: produto.Preco,
      quantia: 1
    }

    // if(this.carrinhoService.itensCarrinho.find()){
    //   console.log("Item já inserido")
    // }

    this.itensCarrinho.push(conteudo)
    console.log(this.itensCarrinho)

    const toast = await this.toastCtrl.create({
      message: `O item ${produto.Nome} foi adicionado ao carrinho`,
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();
  }

  async removerCarrinho(produto: any, index: number){

    this.itensCarrinho.splice(index, 1);

    const toast = await this.toastCtrl.create({
      message: `O item ${produto.nome} foi removido`,
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();

    console.log("Removido")
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

    const alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: `Total da compra = ${formatCurrency(total, 'en-US', 'R$ ')}`,
      buttons: [  
        {  
          text: 'CANCELAR',  
          role: 'cancel',  
          handler: () => {  
            console.log('Compra cancelada');  
          }  
        },  
        {  
          text: 'CONFIRMAR',  
          handler: async () => {  
            console.log('Compra efetuada');
            this.itensCarrinho.splice(0); 
            const toast = await this.toastCtrl.create({
              message: `Compra realizada com sucesso`,
              duration: 1000,
              position: 'bottom',
            });
            await toast.present(); 
          }  
        }  
      ]  ,
    });

    await alert.present();
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

  // conteudoCarrinho(id: number){
  //   this.carrinhoComponent.itensCarrinho.push(this.produtos[id].Id)
  //   console.log(this.carrinhoComponent.itensCarrinho)
  // }
}
