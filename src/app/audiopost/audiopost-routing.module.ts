import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudiopostPage } from './audiopost.page';

const routes: Routes = [
  {
    path: '',
    component: AudiopostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudiopostPageRoutingModule {}
