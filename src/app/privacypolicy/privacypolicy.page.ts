import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.page.html',
  styleUrls: ['./privacypolicy.page.scss'],
})
export class PrivacypolicyPage implements OnInit {
  policy_data:any;
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
    this.pagesservice.getPagesData(14313).subscribe(async results => {
      this.policy_data = results;
      console.log(results);
      await loading.dismiss();
    },
    async (err) => {
  console.log(err);
  await loading.dismiss();
    });
  }
}
