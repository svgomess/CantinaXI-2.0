import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendaDados, VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {
  vendas: VendaDados[] = []; 
  private dateValue: any;

  constructor(
    private route:ActivatedRoute, 
    private vendaService:VendaService,
    ) { }

  ngOnInit() {
    this.vendaService.listarVendas().subscribe((res) => {
      this.vendas.push(...res.dados);
      console.log(res);
    })
  }

  get diaAtual(): any {
    return this.dateValue;
  }

  set diaAtual(value: any) {
    this.dateValue = value;

    let newValue = formatDate(value, 'YYYY-MM-dd', 'pt-br');
    console.log(newValue);
    
    this.vendaService.listarVendaData(newValue).subscribe((res) => {
      this.vendas.splice(0)
      this.vendas.push(...res.dados);
      console.log(res);
    })
  }

}
