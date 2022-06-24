import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatsisyourstoryPage } from './whatsisyourstory.page';

const routes: Routes = [
  {
    path: '',
    component: WhatsisyourstoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatsisyourstoryPageRoutingModule {}
