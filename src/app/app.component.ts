import { Component } from '@angular/core';
import { Network } from '@capacitor/network';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  networkStatus:boolean = false;
  alert:any;
  constructor(
    public alertController: AlertController,
    public router:Router
    ) {

    Network.addListener('networkStatusChange', status => {
      if(!status.connected){
        this.networkStatus = true;
       this.presentAlert("Network problem");
  
      } else{
        this.networkStatus = false;
          this.presentAlert("Network connected...");
      }
    });
  this.logCurrentNetworkStatus();
  }
  async logCurrentNetworkStatus (){
    const status = await Network.getStatus();
    if(!status.connected){
      this.networkStatus = true;
      this.presentAlert('Network status:');
    } else{
      this.networkStatus = false;
    }

  };
  async presentAlert(message) {
   
    // await this.alert.dismiss();
    

if(!this.networkStatus){
    if(this.alert != undefined){
      await this.alert.dismiss();
      this.router.navigate(['/tabs/tab1']);
    }
} else{
  this.alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Warnning',
    backdropDismiss:false,
    // subHeader: 'Subtitle',
    message: message
  });
  await this.alert.present();
}
    
    
  }


}
