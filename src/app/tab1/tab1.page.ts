import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  home_data: any;

  activePageTitle = 'Home';
  Pages = [
    {
      title: 'Home',
      url: '',
      icon: 'albums'
    },
    {
      title: 'Testimonial',
      url: '/testimonial',
      icon: 'person'
    },
    {
      title: 'Quiz',
      url: '/quiz',
      icon: 'person'
    },
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
      title: 'About The Founder',
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
    }
  ];
  
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private pagesservice: PagesService,
    public loadingController:LoadingController
  ) {
    this.fetchData();
  }

  async fetchData() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner:'lines-sharp'
    });
   
    await loading.present();
    this.pagesservice.getPagesData(14220).subscribe(async results => {
      this.home_data = results;
      console.log(results);
      await loading.dismiss();
    },
    async (err) => {
  console.log(err);
  await loading.dismiss();
    }
    
    );
  }
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

}