import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaldosPageRoutingModule } from './saldos-routing.module';

import { SaldosPage } from './saldos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaldosPageRoutingModule
  ],
  declarations: [SaldosPage]
})
export class SaldosPageModule {}
