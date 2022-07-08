import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
=======
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

>>>>>>> a80fc200aac3d208f8d07864dd68353c5886dfbf
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
