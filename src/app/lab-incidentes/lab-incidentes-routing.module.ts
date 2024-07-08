import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabIncidentesPage } from './lab-incidentes.page';

const routes: Routes = [
  {
    path: '',
    component: LabIncidentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabIncidentesPageRoutingModule {}
