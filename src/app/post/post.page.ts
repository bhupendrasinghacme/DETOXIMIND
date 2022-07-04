import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  id: any;
  post_data_all: any;
  constructor(
    private route: ActivatedRoute,
    private post: PostService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  async fetchData() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner: 'lines-sharp'
      // duration: 2000
    });
    await loading.present();
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.post.getOnlyOnePost(this.id).subscribe(async post => {
      this.post_data_all = post;
      await loading.dismiss();
      console.log("post_data_all", this.post_data_all);
    }, async error => {
      await loading.dismiss();
      console.log(error);
    });
  }
}
