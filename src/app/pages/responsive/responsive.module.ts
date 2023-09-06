import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponsivePageRoutingModule } from './responsive-routing.module';

import { ResponsivePage } from './responsive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponsivePageRoutingModule
  ],
  declarations: [ResponsivePage]
})
export class ResponsivePageModule {}
