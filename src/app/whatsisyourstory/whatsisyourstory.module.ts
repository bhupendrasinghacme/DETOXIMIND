import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatsisyourstoryPageRoutingModule } from './whatsisyourstory-routing.module';

import { WhatsisyourstoryPage } from './whatsisyourstory.page';
import { FormstoryComponent } from '../components/formstory/formstory.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatsisyourstoryPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [WhatsisyourstoryPage, FormstoryComponent]
})
export class WhatsisyourstoryPageModule { }
