import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoIncidentesPage } from './curso-incidentes.page';

const routes: Routes = [
  {
    path: '',
    component: CursoIncidentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoIncidentesPageRoutingModule {}
