import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TurnIncidentesPageRoutingModule } from './turn-incidentes-routing.module';

import { TurnIncidentesPage } from './turn-incidentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TurnIncidentesPageRoutingModule
  ],
  declarations: [TurnIncidentesPage]
})
export class TurnIncidentesPageModule {}
