import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClienteDados, ClienteService } from 'src/app/services/cliente.service';
import { CriarClientePage } from '../criar-cliente/criar-cliente.page';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.page.html',
  styleUrls: ['./saldos.page.scss'],
})
export class SaldosPage implements OnInit {
  saldos: ClienteDados[] = [];

  constructor(
    private modalCtrl: ModalController, 
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.carregarClientes();
    console.log(this.saldos)
  }
  
  carregarClientes() {
    this.clienteService.listarClientes().subscribe((res) => {
      res.dados.forEach((cliente: any) => {
        cliente.Categoria === "Saldo" ? this.saldos.push(cliente) : null
      });
    })
  }

  async criarNovoSaldo() {
    const modal = await this.modalCtrl.create({
      component: CriarClientePage,
      componentProps: { value: 123 },
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: ['modal-65']
    })
    await modal.present()
  }
}
