import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisuaClipPage } from './visua-clip.page';

const routes: Routes = [
  {
    path: '',
    component: VisuaClipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisuaClipPageRoutingModule {}
