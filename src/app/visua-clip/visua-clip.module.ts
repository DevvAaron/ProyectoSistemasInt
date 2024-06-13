import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisuaClipPageRoutingModule } from './visua-clip-routing.module';

import { VisuaClipPage } from './visua-clip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VisuaClipPageRoutingModule
  ],
  declarations: [VisuaClipPage]
})
export class VisuaClipPageModule {}
