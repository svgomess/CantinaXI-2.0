import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarVendedorPageRoutingModule } from './adicionar-vendedor-routing.module';

import { AdicionarVendedorPage } from './adicionar-vendedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarVendedorPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdicionarVendedorPage]
})
export class AdicionarVendedorPageModule {}
