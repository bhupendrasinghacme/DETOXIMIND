import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.page.html',
  styleUrls: ['./termsandconditions.page.scss'],
})
export class TermsandconditionsPage implements OnInit {
  terms_condition_data:any;
  constructor(
private  pagesservice:PagesService,
public loadingController:LoadingController
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
    this.pagesservice.getPagesData(14315).subscribe(async results => {
      this.terms_condition_data = results;
      console.log(results);
      await loading.dismiss();
    },
    async (err) => {
  console.log(err);
  await loading.dismiss();
    }
    
    );
  }

}
