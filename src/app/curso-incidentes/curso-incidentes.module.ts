import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoIncidentesPageRoutingModule } from './curso-incidentes-routing.module';

import { CursoIncidentesPage } from './curso-incidentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursoIncidentesPageRoutingModule
  ],
  declarations: [CursoIncidentesPage]
})
export class CursoIncidentesPageModule {}
