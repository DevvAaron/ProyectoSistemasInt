import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurnIncidentesPage } from './turn-incidentes.page';

const routes: Routes = [
  {
    path: '',
    component: TurnIncidentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TurnIncidentesPageRoutingModule {}
