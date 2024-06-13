import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaClipsPage } from './lista-clips.page';

const routes: Routes = [
  {
    path: '',
    component: ListaClipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaClipsPageRoutingModule {}
