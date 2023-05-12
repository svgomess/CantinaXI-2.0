import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaprodutosPageRoutingModule } from './listaprodutos-routing.module';

import { ListaprodutosPage } from './listaprodutos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaprodutosPageRoutingModule
  ],
  declarations: [ListaprodutosPage]
})
export class ListaprodutosPageModule {}
