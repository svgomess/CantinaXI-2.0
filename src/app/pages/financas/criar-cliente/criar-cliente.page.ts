import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AnoDados, AnoService } from 'src/app/services/ano.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-criar-cliente',
  templateUrl: './criar-cliente.page.html',
  styleUrls: ['./criar-cliente.page.scss'],
})
export class CriarClientePage implements OnInit {
  anos: AnoDados[] = [];
  dadosForm!: FormGroup;

  constructor(
      private toastCtrl:ToastController,
      private alertCtrl: AlertController,
      private modalCtrl: ModalController,
      private anoService: AnoService,
      private clienteService: ClienteService,
    ) {}

  ngOnInit() {
    this.carregarAnos()
    console.log(this.anos)

    this.dadosForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('Saldo', Validators.required),
      periodo: new FormControl('', Validators.required),
      ano: new FormControl('', Validators.required),
      saldo: new FormControl('', Validators.required)
    })
  }

  carregarAnos(){
    this.anoService.listarAnos().subscribe((res) => {
      this.anos.push(...res.dados);
    })
  }

  enviar(){
    if(this.dadosForm.valid){
      this.registrarCliente()
      this.mostrarToast()
      this.fechar()
    } else {
      this.mostrarAlerta()
    }
  }
  
  fechar() {
    this.modalCtrl.dismiss()
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
      message: `Um novo cliente foi registrado com sucesso`,
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();
  }

  registrarCliente(){
    const dadosCliente: any = {
      'Nome': this.dadosForm.value.nome,
      'Categoria': 'Saldo',
      'Periodo': this.dadosForm.value.periodo,
      'FkAno': this.dadosForm.value.ano,
      'Saldo': this.dadosForm.value.saldo
    }

    this.clienteService.adicionarCliente(dadosCliente)
  }
}
