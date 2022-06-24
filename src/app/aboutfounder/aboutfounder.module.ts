import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutfounderPageRoutingModule } from './aboutfounder-routing.module';

import { AboutfounderPage } from './aboutfounder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutfounderPageRoutingModule
  ],
  declarations: [AboutfounderPage]
})
export class AboutfounderPageModule {}
