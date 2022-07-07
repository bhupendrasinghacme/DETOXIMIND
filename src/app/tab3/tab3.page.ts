import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { LoadingController } from '@ionic/angular';
import { element } from 'protractor';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  posts: any;
  Categories_data: any;
  category_id: any;
  constructor(
    private router: Router,
    private post: PostService,
    public loadingController: LoadingController
  ) {
    this.getAllCategory();
  }

  loadData(event: any) {
    const page = (Math.ceil(this.posts.length / 10)) + 1;
    this.post.getPostDataPage(this.category_id, page).subscribe(
      async (newPagePosts) => {
        this.posts.push(...newPagePosts);
        event.target.complete();
      },
      async (err) => {
        event.target.disabled = true;
        console.log(err);
      });
  }


  async getAllCategory() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner: 'lines-sharp'
    });
    await loading.present();
    this.post.getAllCategories().subscribe(async item => {
      this.Categories_data = item;
      await loading.dismiss();
      setTimeout(() => {
        document.getElementById("default_clicked").click();
      }, 100)
    },
      async (err) => {
        console.log(err);
        await loading.dismiss();
      })

  }

  async getPostDataCat_id(id) {
    document.querySelectorAll('.inactive').forEach(element => {
      element.classList.remove('active');
    })
    document.querySelector('.active_' + id).classList.add('active');

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner: 'lines-sharp'
    });
    await loading.present();
    this.category_id = id;
    this.post.getPostDataPage(id, 1).subscribe(async data => {
      this.posts = data;
      await loading.dismiss();

    },
      async (err) => {
        console.log(err);
        await loading.dismiss();
      })
  }

}
