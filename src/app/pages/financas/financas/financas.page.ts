import { Component, OnInit } from '@angular/core';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-financas',
  templateUrl: './financas.page.html',
  styleUrls: ['./financas.page.scss'],
})
export class FinancasPage implements OnInit {
  totalDiario: any = "0.00";
  tema = localStorage.getItem('tema')

  constructor(
    private vendaService:VendaService,
    ) { }

  ngOnInit() {
    this.vendaService.totalDiario().subscribe((res) => {
      this.totalDiario = res.total.Total;
      this.totalDiario == null ? this.totalDiario = 0.00 : null;
    })
  }

}
