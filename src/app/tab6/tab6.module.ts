import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab6Page } from './tab6.page';

import { Tab6PageRoutingModule } from './tab6-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab6Page }]),
    Tab6PageRoutingModule,
  ],
  declarations: [Tab6Page]
})
export class Tab6PageModule {}
