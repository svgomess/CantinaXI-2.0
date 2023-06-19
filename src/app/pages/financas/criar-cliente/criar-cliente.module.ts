import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarClientePageRoutingModule } from './criar-cliente-routing.module';

import { CriarClientePage } from './criar-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarClientePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CriarClientePage]
})
export class CriarClientePageModule {}
