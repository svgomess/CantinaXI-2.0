import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { CarrinhoService, VendaDados } from 'src/app/services/carrinho.service';
import { ClienteDados, ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.page.html',
  styleUrls: ['./confirmar.page.scss'],
})
export class ConfirmarPage implements OnInit {
  dadosForm!: FormGroup;
  radioSelecionado: any;

  @Input("total") total!: number;

  mensalistas: ClienteDados[] = [];
  saldos: ClienteDados[] = [];

  formasDePagamento = ["generico", "mensal", "saldo"];

  constructor(
    private clienteService: ClienteService,
    private carrinhoService: CarrinhoService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.carregarClientes()

    this.dadosForm = new FormGroup({
      formaPagamento: new FormControl('generico'),
      clienteMensal: new FormControl(null),
      clienteSaldo: new FormControl(null)
    })

    console.log(this.carrinhoService.itensCarrinho)
  }

  carregarClientes() {
    this.clienteService.listarClientes().subscribe((res) => {
      res.dados.forEach((cliente: any) => {
        cliente.Categoria === "Mensalista" ? this.mensalistas.push(cliente) : null
      });

      res.dados.forEach((cliente: any) => {
        cliente.Categoria === "Saldo" ? this.saldos.push(cliente) : null
      });
    })
  }

  fechar() {
    this.modalCtrl.dismiss()
  }

  enviar() {
    if (this.dadosForm.value.formaPagamento == 'generico') {
      this.confirmarVenda(1, 1);
    } else if (this.dadosForm.value.formaPagamento == 'mensal') {
      let cliente = this.dadosForm.value.clienteMensal
      cliente == null ? this.mostrarAlerta() : this.confirmarVenda(2, cliente);
    } else if (this.dadosForm.value.formaPagamento == 'saldo') {
      let cliente = this.dadosForm.value.clienteSaldo
      cliente == null ? this.mostrarAlerta() : this.confirmarVenda(3, cliente);
    }
  }

  async mostrarAlerta() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: 'Escolha o cliente.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async confirmarVenda(pagamento: number, cliente: number) {

    const dadosVenda: VendaDados = {
      'ValorTotal': this.total,
      'FkCliente': cliente,
      'FkFormaPagamento': pagamento,
      'FkUsuario': 'Placeholder',
      'Produtos': this.carrinhoService.itensCarrinho
    }

    this.carrinhoService.enviarVenda(dadosVenda, this.carrinhoService.itensCarrinho)
    this.carrinhoService.itensCarrinho.splice(0);
    this.modalCtrl.dismiss()

    const toast = await this.toastCtrl.create({
      message: `Compra realizada com sucesso`,
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();

  }

  determinarRadio(id: any) {
    this.radioSelecionado = id;
  }

}
