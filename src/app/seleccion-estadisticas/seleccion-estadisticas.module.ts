import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionEstadisticasPageRoutingModule } from './seleccion-estadisticas-routing.module';

import { SeleccionEstadisticasPage } from './seleccion-estadisticas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionEstadisticasPageRoutingModule
  ],
  declarations: [SeleccionEstadisticasPage]
})
export class SeleccionEstadisticasPageModule {}
