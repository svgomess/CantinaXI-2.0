import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AdminService, UsuarioDados } from 'src/app/services/admin.service';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  admin: any;
  md5: any;
  login: UsuarioDados[] = []

  constructor(
    private alertCtrl: AlertController,
    private adminService: AdminService,
    private router: Router
    ) { }

  ngOnInit() {
    localStorage.setItem('telaInicial', 'true')
    localStorage.setItem('administrador', 'false')

    this.adminService.retornarAdmin().subscribe((res) => {
      this.admin = res
    })
  }

  pedirLogin(){
    this.criarLoginAlert()
  }

  async loginVendedor(){
    const alert = await this.alertCtrl.create({
      header: 'Vendedor',
      inputs: [
        {  
          name: 'Login',  
          type: 'text',  
          placeholder: 'Digite o login do vendedor'
        },
        {  
          name: 'Chave',  
          type: 'password',  
          placeholder: 'Digite a chave do vendedor'
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
            this.verificarLogin(data.Login, data.Chave);
          }
        }  
      ],
    });

    await alert.present();
  }

  async erroLogin() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: 'Senha incorreta.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async criarLoginAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Administrador',
      inputs: [
        {  
          name: 'Senha',  
          type: 'password',
          placeholder: 'Digite a senha do admin'
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
          role: 'confirm',  
          handler: async (data: any) => { 

            const chaveAdmin = this.criarHash(data.Senha)
            if(this.admin.Senha == chaveAdmin)
            {
              localStorage.setItem('administrador', 'true');
              location.href = '/tabs/vendedores';
            } else 
            {
              this.erroLogin();
            } 
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

  async erroLoginVendedor(mensagem: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: mensagem,
      buttons: ['OK'],
    });

    await alert.present();
  }

  criarHash(senha: any) {
    this.md5 = Md5.hashStr(senha)
    return this.md5
  }

  verificarLogin(login: string, chave: string){
    this.adminService.buscarVendedor(login).subscribe((res) => {
      if(res.status === 404){
        this.erroLoginVendedor("O vendedor não foi encontrado.");
      } else if(res.dados.Senha === chave){
        location.href = '/tabs/pedidos'; 

        localStorage.setItem('vendedorid', res.dados.Login);
        localStorage.setItem('vendedor', res.dados.Nome);
        localStorage.setItem('administrador', 'false');
      } else {
        this.erroLoginVendedor("Senha incorreta.");
      }
    })
  }
}
