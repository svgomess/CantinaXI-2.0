import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensalistasPageRoutingModule } from './mensalistas-routing.module';

import { MensalistasPage } from './mensalistas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensalistasPageRoutingModule
  ],
  declarations: [MensalistasPage]
})
export class MensalistasPageModule {}
