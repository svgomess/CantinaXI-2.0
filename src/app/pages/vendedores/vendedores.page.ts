import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { AdicionarVendedorPage } from '../adicionar-vendedor/adicionar-vendedor.page';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.page.html',
  styleUrls: ['./vendedores.page.scss'],
})
export class VendedoresPage implements OnInit {
  admin = localStorage.getItem('administrador');
  vendedores: any = [];
  checadoTema = false;
  checadoEditor = false;

  constructor(
    private adminService: AdminService,
    private modalCtrl: ModalController, 
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
    if(localStorage.getItem('tema') != 'light'){
      this.checadoTema = true;
      document.body.setAttribute('color-theme', 'dark');
      localStorage.setItem('tema', 'dark');
    }

    if(localStorage.getItem('gerenciamento') != 'false'){
      this.checadoEditor = true;
      localStorage.setItem('gerenciamento', 'true');
    }
    
    this.carregarVendedores();
  }

  alterarTema(event: any){
    if(event.detail.checked){
      document.body.setAttribute('color-theme', 'dark');
      localStorage.setItem('tema', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
      localStorage.setItem('tema', 'light');
    }
  }
  
  alterarModo(event: any){
    location.href = '/tabs/pedidos';
    if(event.detail.checked){
      localStorage.setItem('gerenciamento', 'true');
    } else {
      localStorage.setItem('gerenciamento', 'false');
    }
  }

  async carregarVendedores(){
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      spinner: 'circles'
    });
    await loading.present();

    this.adminService.listarVendedores().subscribe((res) => {
      loading.dismiss();
      this.vendedores.splice(0)
      this.vendedores.push(...res);
    })
  }

  async adicionarVendedor(){
    const modal = await this.modalCtrl.create({
      component: AdicionarVendedorPage,
      componentProps: { value: 123 },
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: ['modal-55']
    })
    await modal.present()
  }

  async toastRemover(){
    const toast = await this.toastCtrl.create({
      message: `Vendedor removido com sucesso.`,
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();
  }

  async removerVendedor(login: any){
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      message: 'Deseja mesmo remover este vendedor?',
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
            this.adminService.removerVendedor(login);
            location.href = '/tabs/vendedores';
            this.toastRemover();
          }
        }  
      ],
    });

    await alert.present();
  }

}
