import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  feedbacK_data:any;
  constructor(
    private pagesservice:PagesService,
    private loadingController:LoadingController
  ) {
    this.fetchData();
   }

  ngOnInit() {
  }
  async fetchData() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner:'lines-sharp'
    });
    
    await loading.present();
    this.pagesservice.getPagesData(14280).subscribe(async results => {
      this.feedbacK_data = results;
      console.log(results);
      await loading.dismiss();
    },
    async (err) => {
    console.log(err);
    await loading.dismiss();
    });
  }
}
