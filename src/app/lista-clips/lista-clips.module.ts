import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaClipsPageRoutingModule } from './lista-clips-routing.module';

import { ListaClipsPage } from './lista-clips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ListaClipsPageRoutingModule
  ],
  declarations: [ListaClipsPage]
})
export class ListaClipsPageModule {}
