import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurteamPageRoutingModule } from './ourteam-routing.module';

import { OurteamPage } from './ourteam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OurteamPageRoutingModule
  ],
  declarations: [OurteamPage]
})
export class OurteamPageModule {}
