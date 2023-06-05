import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
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

  constructor(
    private route:ActivatedRoute, 
    private alertCtrl: AlertController,
    private produtoService:ProdutoService,
    private categoriaService:CategoriaService) { }

  ngOnInit() {
    this.produtoService.mostrarProduto(this.id).subscribe((res) => {
      this.produto = res.dados;
      console.log(this.produto);

      let categoriaProduto = this.categoriaService.selecionarCategoria(this.produto.Id)
      console.log(categoriaProduto);
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
            console.log('Cancelado');  
          }  
        },  
        {  
          text: 'CONFIRMAR',  
          handler: async (data: any) => {
            // console.log(this.id) 
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

}
