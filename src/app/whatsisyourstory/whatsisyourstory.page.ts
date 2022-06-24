import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-whatsisyourstory',
  templateUrl: './whatsisyourstory.page.html',
  styleUrls: ['./whatsisyourstory.page.scss'],
})
export class WhatsisyourstoryPage implements OnInit {
  whats_story_data:any;
  constructor(
private pagesservice:PagesService,
private loadingController:LoadingController
  ) { }

  ngOnInit() {
    this.fetchData();
  }
  async fetchData() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner:'lines-sharp'
    });
    
    await loading.present();
    this.pagesservice.getPagesData(14269).subscribe(async results => {
      this.whats_story_data = results;
      console.log(results);
      await loading.dismiss();
    },
    async (err) => {
  console.log(err);
  await loading.dismiss();
    });
  }
}
