import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfIncidentesPageRoutingModule } from './prof-incidentes-routing.module';

import { ProfIncidentesPage } from './prof-incidentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfIncidentesPageRoutingModule
  ],
  declarations: [ProfIncidentesPage]
})
export class ProfIncidentesPageModule {}
