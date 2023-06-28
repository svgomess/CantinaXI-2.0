import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-adicionar-vendedor',
  templateUrl: './adicionar-vendedor.page.html',
  styleUrls: ['./adicionar-vendedor.page.scss'],
})
export class AdicionarVendedorPage implements OnInit {
  dadosForm!: FormGroup;

  constructor(
    private toastCtrl:ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private adminService: AdminService) { }

  ngOnInit() {
    
    this.dadosForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      login: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    })
  }

  enviar(){
    if(this.dadosForm.valid){
      this.registrarVendedor()
      this.mostrarToast()
      this.fechar()
    } else {
      this.mostrarAlerta()
    }
  }

  async mostrarAlerta() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: 'Preencha todos os campos.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async mostrarToast() {
    const toast = await this.toastCtrl.create({
      message: `Um novo produto foi registrado com sucesso`,
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();
  }

  fechar() {
    this.modalCtrl.dismiss()
  }

  registrarVendedor(){
    const dadosVendedor: any = {
      'Nome': this.dadosForm.value.nome,
      'Login': this.dadosForm.value.login,
      'Email': this.dadosForm.value.email
    }

    this.adminService.registrarVendedor(dadosVendedor)
    location.href = '/tabs/vendedores';
  }

}
