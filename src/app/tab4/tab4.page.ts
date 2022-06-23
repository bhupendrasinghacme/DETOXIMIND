import { Component } from '@angular/core';
import { PagesService } from '../services/pages.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  helpline:any;
  constructor(
    private pages_service:PagesService,
    private loadingController:LoadingController
    ) {
  
      this.loadingData();
  }

async loadingData(){
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    spinner:'lines-sharp'
  });
  await loading.present();
  this.pages_service.getPagesData(14158).subscribe(async item=>{
    this.helpline = item;
    console.log(this.helpline);
    await loading.dismiss();
    },async err=>{
      console.log(err);
      await loading.dismiss();
    })
}

}
