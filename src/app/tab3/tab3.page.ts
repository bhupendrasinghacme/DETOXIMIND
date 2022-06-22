import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  posts:any;
  constructor(
    private router: Router,
    private post :PostService,
    public loadingController: LoadingController
  ) {
   this.loadInitData();
  }

  async loadInitData(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner:'lines-sharp'
    });
    await loading.present();
  this.post.getPostData(1).subscribe(
    async (res) => {
      this.posts = res;
      console.log(this.posts)
      await loading.dismiss();
    },
    async (err) => {
  console.log(err);
  await loading.dismiss();
    }
  );
  }


  loadData(event: any) {
    const page = (Math.ceil(this.posts.length / 10)) + 1;
    this.post.getPostData(page).subscribe(
      async (newPagePosts) => {
        this.posts.push(...newPagePosts);
        event.target.complete();
        // console.log(this.posts)
      },
    async (err) => {
      event.target.disabled = true;
  console.log(err);
    });
  }

}
