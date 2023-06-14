import { Component, OnInit } from '@angular/core';
import { ClienteDados, ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.page.html',
  styleUrls: ['./saldos.page.scss'],
})
export class SaldosPage implements OnInit {
  saldos: ClienteDados[] = [];

  constructor(
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

}
