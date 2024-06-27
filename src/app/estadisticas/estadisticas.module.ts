import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticasPageRoutingModule } from './estadisticas-routing.module';

import { EstadisticasPage } from './estadisticas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EstadisticasPageRoutingModule
  ],
  declarations: [EstadisticasPage]
})
export class EstadisticasPageModule {}
