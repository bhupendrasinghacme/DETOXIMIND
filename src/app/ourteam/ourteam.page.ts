import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-ourteam',
  templateUrl: './ourteam.page.html',
  styleUrls: ['./ourteam.page.scss'],
})
export class OurteamPage implements OnInit {
  ourteam:any;
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
    this.pagesservice.getPagesData(14265).subscribe(async results => {
      this.ourteam = results;
      console.log(results);
      await loading.dismiss();
    },
    async (err) => {
  console.log(err);
  await loading.dismiss();
    });
  }

}
