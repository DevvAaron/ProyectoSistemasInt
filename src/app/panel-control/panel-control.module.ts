import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelControlPageRoutingModule } from './panel-control-routing.module';
import { PanelControlPage } from './panel-control.page';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PanelControlPageRoutingModule,
    HttpClientModule  // Añade HttpClientModule aquí
  ],
  declarations: [PanelControlPage]
})
export class PanelControlPageModule {}
