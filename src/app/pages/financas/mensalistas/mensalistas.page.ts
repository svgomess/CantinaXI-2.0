import { Component, OnInit } from '@angular/core';
import { ClienteDados, ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-mensalistas',
  templateUrl: './mensalistas.page.html',
  styleUrls: ['./mensalistas.page.scss'],
})
export class MensalistasPage implements OnInit {
  mensalistas: ClienteDados[] = [];

  constructor(
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.carregarClientes();
    console.log(this.mensalistas)
  }
  
  carregarClientes() {
    this.clienteService.listarClientes().subscribe((res) => {
      res.dados.forEach((cliente: any) => {
        cliente.Categoria === "Mensalista" ? this.mensalistas.push(cliente) : null
      });
    })
  }

}
