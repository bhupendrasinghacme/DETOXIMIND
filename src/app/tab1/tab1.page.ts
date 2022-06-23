import { Component } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { Router } from '@angular/router';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  home_data: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private pagesservice: PagesService
  ) {
    this.fetchData();
  }

  fetchData() {
    // this.pagesservice.getPagesData(14243).subscribe(results => {
     
    //   // console.log("header data",results);
    //   console.log(results['content']['rendered'])
    // });
    this.pagesservice.getPagesData(14220).subscribe(results => {
      this.home_data = results;
      console.log(results);
      // console.log(this.home_data.content.rendered)
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}