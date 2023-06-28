import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendedoresPageRoutingModule } from './vendedores-routing.module';

import { VendedoresPage } from './vendedores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendedoresPageRoutingModule
  ],
  declarations: [VendedoresPage]
})
export class VendedoresPageModule {}
