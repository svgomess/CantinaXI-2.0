import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoProdutoPageRoutingModule } from './info-produto-routing.module';

import { InfoProdutoPage } from './info-produto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoProdutoPageRoutingModule
  ],
  declarations: [InfoProdutoPage]
})
export class InfoProdutoPageModule {}
