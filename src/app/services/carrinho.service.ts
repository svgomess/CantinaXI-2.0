import { CurrencyPipe, DecimalPipe, formatCurrency, formatNumber } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface VendaDados {
  ValorTotal: number
  FkCliente: number
  FkFormaPagamento: number
  FkUsuario: string
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
      inputs: [
        {  
          name: 'radio 1',  
          type: 'radio',  
          label: 'Genérico',  
          value: 1,  
          checked: true,  
        },  
        {  
          name: 'radio 2',  
          type: 'radio',  
          label: 'Mensal',  
          value: 2,  
          disabled: true
        },  
        {  
          name: 'radio 3',  
          type: 'radio',  
          label: 'Saldo',  
          value: 3,  
          disabled: true
        }
      ],
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
          handler: async (pagamento: number) => { 
            const dadosVenda: VendaDados = {
              'ValorTotal': total,
              'FkCliente': 1,
              'FkFormaPagamento': pagamento,
              'FkUsuario': 'Placeholder',
              'Produtos': this.itensCarrinho
            }

            this.enviarVenda(dadosVenda, this.itensCarrinho)
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

  enviarVenda(venda: VendaDados, produtos: any){
    produtos.forEach(function(produto: any) {      
      console.log(produto);
    });

    return this.http.post<VendaDados>(`${environment.baseUrl}/venda/inserir`, venda, this._options).subscribe(res => (
      console.log(res)
    ));
  }

  // cadastrarVenda(venda: VendaDados): Observable<any> {      
  //   return this.http.post(`${environment.baseUrl}/venda/inserir`, JSON.stringify(venda), this._options);
  // }
}
