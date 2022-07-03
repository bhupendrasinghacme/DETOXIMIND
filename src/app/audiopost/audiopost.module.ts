import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudiopostPageRoutingModule } from './audiopost-routing.module';

import { AudiopostPage } from './audiopost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudiopostPageRoutingModule
  ],
  declarations: [AudiopostPage]
})
export class AudiopostPageModule {}
