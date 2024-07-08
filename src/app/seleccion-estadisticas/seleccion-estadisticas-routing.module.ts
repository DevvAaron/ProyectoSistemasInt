import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionEstadisticasPage } from './seleccion-estadisticas.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionEstadisticasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionEstadisticasPageRoutingModule {}
