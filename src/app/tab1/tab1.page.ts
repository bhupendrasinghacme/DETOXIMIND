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
  html_data_length: any = 0;
  slides = [];
  slideConfig = {
    slidesToShow: 1, autoplay: true, loop: true

  };
  html_data: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private pagesservice: PagesService,
    public loadingController: LoadingController
  ) {
    this.fetchData();
  }

  async fetchData() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner: 'lines-sharp'
    });

    await loading.present();
    this.pagesservice.getPagesData(14220).subscribe(async results => {
      this.home_data = results;
      console.log(results);
      setTimeout(() => {
        this.html_data = document.querySelectorAll('.sp-testimonial-item');
        this.html_data_length = this.html_data.length;
        // document.querySelectorAll(".elementor-image-carousel.swiper-wrapper .swiper-slide figure .swiper-slide-image").forEach(element => {
        //   this.slides.push({ img: element.getAttribute('src') })
        // });
      }, 1000);
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