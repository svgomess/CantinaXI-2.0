import { Component, OnInit } from '@angular/core';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-financas',
  templateUrl: './financas.page.html',
  styleUrls: ['./financas.page.scss'],
})
export class FinancasPage implements OnInit {
  totalDiario: any;

  constructor(
    private vendaService:VendaService,
    ) { }

  ngOnInit() {
    this.vendaService.totalDiario().subscribe((res) => {
      this.totalDiario = res.total.Total;
    })
  }

}
