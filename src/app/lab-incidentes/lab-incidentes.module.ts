import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabIncidentesPageRoutingModule } from './lab-incidentes-routing.module';

import { LabIncidentesPage } from './lab-incidentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LabIncidentesPageRoutingModule
  ],
  declarations: [LabIncidentesPage]
})
export class LabIncidentesPageModule {}
