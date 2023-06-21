import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  pedirLogin(){
    console.log("Login")
    this.criarLoginAlert()
  }

  async inserirNome(){
    const alert = await this.alertCtrl.create({
      header: 'Vendedor',
      inputs: [
        {  
          name: 'Nome',  
          type: 'text',  
          placeholder: 'Nome do vendedor'
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
            data.Nome == '' ? this.mostrarAlerta() : localStorage.setItem('vendedor', data.Nome);  location.href = '/tabs/pedidos';
          }
        }  
      ],
    });

    await alert.present();
  }

  async criarLoginAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Login',
      inputs: [
        {  
          name: 'Usuario',  
          type: 'text',  
          placeholder: 'Nome de usuario'
        },
        {  
          name: 'Senha',  
          type: 'password',
          placeholder: 'Senha'
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
          role: 'confirm',  
          handler: async (data: any) => { 
            const dados = {
              'Nome': data.Usuario,
              'Senha': data.Senha
            }
            console.log(dados)
          }
        }  
      ],
    });

    await alert.present();
  }

  async mostrarAlerta() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: 'Preencha o campo.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
