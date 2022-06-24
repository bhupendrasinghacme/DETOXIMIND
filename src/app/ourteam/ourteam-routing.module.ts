import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OurteamPage } from './ourteam.page';

const routes: Routes = [
  {
    path: '',
    component: OurteamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OurteamPageRoutingModule {}
