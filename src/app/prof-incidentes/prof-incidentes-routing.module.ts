import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfIncidentesPage } from './prof-incidentes.page';

const routes: Routes = [
  {
    path: '',
    component: ProfIncidentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfIncidentesPageRoutingModule {}
