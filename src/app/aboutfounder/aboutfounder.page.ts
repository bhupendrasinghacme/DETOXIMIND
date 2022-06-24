import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-aboutfounder',
  templateUrl: './aboutfounder.page.html',
  styleUrls: ['./aboutfounder.page.scss'],
})
export class AboutfounderPage implements OnInit {
  founder_data:any;
  constructor(
    private loadingController:LoadingController,
    private pagesservice:PagesService
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
    this.pagesservice.getPagesData(14261).subscribe(async results => {
      this.founder_data = results;
      console.log(results);
      await loading.dismiss();
    },
    async (err) => {
  console.log(err);
  await loading.dismiss();
    });
  }
}
