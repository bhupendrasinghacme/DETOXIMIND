import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatsisyourstoryPageRoutingModule } from './whatsisyourstory-routing.module';

import { WhatsisyourstoryPage } from './whatsisyourstory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatsisyourstoryPageRoutingModule
  ],
  declarations: [WhatsisyourstoryPage]
})
export class WhatsisyourstoryPageModule {}
