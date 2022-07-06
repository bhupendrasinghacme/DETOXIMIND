import { Component } from '@angular/core';
import { Network } from '@capacitor/network';
import { AlertController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Platform, MenuController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  networkStatus: boolean = false;
  alert: any;
  isLoggedIn: boolean = true;
  activePageTitle = 'Home';
  Pages = [
    {
      title: 'Home',
      url: '',
      icon: 'albums'
    },
    // {
    //   title: 'Testimonial',
    //   url: '/testimonial',
    //   icon: 'person'
    // },
    // {
    //   title: 'Quiz',
    //   url: '/quiz',
    //   icon: 'person'
    // },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Terms & Conditions',
      url: '/termsandconditions',
      icon: 'person'
    },
    {
      title: 'PRIVACY & POLICY',
      url: '/privacypolicy',
      icon: 'person'
    },
    {
      title: 'The Founder',
      url: '/aboutfounder',
      icon: 'person'
    },
    {
      title: "What's your Story",
      url: '/whatsisyourstory',
      icon: 'person'
    },
    {
      title: "Feedback",
      url: '/feedback',
      icon: 'person'
    },
    {
      title: "Our Team",
      url: '/ourteam',
      icon: 'person'
    }
  ];
  constructor(
    public alertController: AlertController,
    public router: Router,
    private authService: AuthenticationService,
    private menu: MenuController,
    private platform: Platform,
    private _location: Location,

  ) {

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        const path = window.location.pathname;
        switch (path) {
          case '/login':
            // code block
            this.isLoggedIn = false;
            break;
          case '/signuppage':
            // code block
            this.isLoggedIn = false;
            break;
          default:
            this.isLoggedIn = true;

        }
      }
    });

    Network.addListener('networkStatusChange', status => {
      if (!status.connected) {
        this.networkStatus = true;
        this.presentAlert("Network problem");

      } else {
        this.networkStatus = false;
        this.presentAlert("Network connected...");
      }
    });
    this.logCurrentNetworkStatus();
    this.backButtonEvent();
  }

  async logCurrentNetworkStatus() {
    const status = await Network.getStatus();
    if (!status.connected) {
      this.networkStatus = true;
      this.presentAlert('Network status:');
    } else {
      this.networkStatus = false;
    }

  };

  async presentAlert(message) {
    if (!this.networkStatus) {
      if (this.alert != undefined) {
        await this.alert.dismiss();
        this.router.navigate(['/tabs/tab1']);
      }
    } else {
      this.alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Warnning',
        backdropDismiss: false,
        // subHeader: 'Subtitle',
        message: message
      });
      await this.alert.present();
    }
  }
  async logout() {
    this.openEnd();
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
  openEnd() {
    this.menu.close();
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      const path = window.location.pathname;
      if (path === '/tabs/tab1') {
        navigator['app'].exitApp();
      } else {
        this._location.back();
      }
    });
  }
}
