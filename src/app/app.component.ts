import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  vendedor = localStorage.getItem('vendedor');
  admin = localStorage.getItem('administrador');
  telaInicial = localStorage.getItem('telaInicial');
  checadoTema = false;
  checadoEditor = false;

  constructor() {}

  ngOnInit(){
    if(this.vendedor == null && this.admin == null && this.telaInicial == null){
      location.href = '/admin';
    }

    localStorage.setItem('telaInicial', 'false');

    if(localStorage.getItem('tema') != 'light'){
      this.checadoTema = true;
      document.body.setAttribute('color-theme', 'dark');
      localStorage.setItem('tema', 'dark');
    }

    if(localStorage.getItem('gerenciamento') != 'false' || this.admin === 'true'){
      this.checadoEditor = true;
      localStorage.setItem('gerenciamento', 'true');
    }
  }

  alterarTema(event: any){
    if(event.detail.checked){
      document.body.setAttribute('color-theme', 'dark');
      localStorage.setItem('tema', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
      localStorage.setItem('tema', 'light');
    }
  }
  
  alterarModo(event: any){
    location.href = '/tabs/pedidos';
    if(event.detail.checked){
      localStorage.setItem('gerenciamento', 'true');
    } else {
      localStorage.setItem('gerenciamento', 'false');
    }
  }
}
