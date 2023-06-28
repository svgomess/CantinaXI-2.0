import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-info-produto',
  templateUrl: './info-produto.page.html',
  styleUrls: ['./info-produto.page.scss'],
})
export class InfoProdutoPage implements OnInit {
  produto: any = null;
  id: any = this.route.snapshot.paramMap.get('id');
  admin = localStorage.getItem('administrador');

  constructor(
    private route:ActivatedRoute, 
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private produtoService:ProdutoService,
    private categoriaService:CategoriaService) { }

  ngOnInit() {
    this.produtoService.mostrarProduto(this.id).subscribe((res) => {
      this.produto = res.dados;

      let categoriaProduto = this.categoriaService.selecionarCategoria(this.produto.Id)
    })
  }

  async mostrarAtualizarProduto(campo: string, desc: string) {
    const alert = await this.alertCtrl.create({
      header: `Atualizar ${desc}`,
      inputs: [
        {  
          name: 'atualizacao',  
          type: 'number',  
          placeholder: 'Atualização'
        }
      ],
      buttons: [  
        {  
          text: 'CANCELAR',  
          role: 'cancel',  
          handler: () => {  
          }  
        },  
        {  
          text: 'CONFIRMAR',  
          handler: async (data: any) => {
            if(data.atualizacao != '') {
              this.produtoService.atualizarProduto(this.id, campo, data.atualizacao); 
              this.ngOnInit();
            }
          }
        }  
      ],
    });

    await alert.present();
  }

  async toastRemover(){
    const toast = await this.toastCtrl.create({
      message: `Produto removido com sucesso.`,
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();
  }

  async removerProduto(){
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      message: 'Deseja mesmo remover este produto?',
      buttons: [  
        {  
          text: 'CANCELAR',  
          role: 'cancel',  
          handler: () => {  
          }  
        },  
        {  
          text: 'CONFIRMAR',
          role: 'confirm',  
          handler: () => { 
            this.produtoService.removerProduto(this.id);
            location.href = '/tabs/estoque';
            this.toastRemover();
          }
        }  
      ],
    });

    await alert.present();
  }
}
