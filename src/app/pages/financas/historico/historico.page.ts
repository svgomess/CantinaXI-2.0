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

}
