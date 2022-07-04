import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IonContent } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthenticationService } from './../services/authentication.service';
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})

export class ChatroomPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  message = '';
  currentUser = 'bhupendra';
  messages: any;
  selected = [];
  private itemDoc: AngularFirestoreCollection<any>;
  item: Observable<any[]>;
  user_Data: any;
  constructor(
    private toast: ToastController,
    private db: AngularFirestore,
    private authService: AuthenticationService,
    public loadingController: LoadingController
  ) {
  }

  ngOnInit() {
    this.itemDoc = this.db.collection<any>('messages', ref => ref.orderBy('createdAt'));
    this.authService.getUserData().then(item => {
      this.user_Data = JSON.parse(item.value);
      this.currentUser = this.user_Data.displayName;
    })
    this.getMessage();


  }
  sendMessage() {
    let myDate = new Date();
    let myDateTemp = new Date(myDate);
    let data = { user: this.currentUser, msg: this.message, createdAt: myDateTemp };
    this.itemDoc.add(data).then(itm => {
      // this.getMessage();
      this.message = '';

    })

  }
  async getMessage() {
    this.item = await this.itemDoc.valueChanges();
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner: 'lines-sharp'
    });
    await loading.present();
    this.item.subscribe(async item => {
      this.messages = await item;
      setTimeout(() => { this.content.scrollToBottom() }, 0)
      await loading.dismiss();
    })
  }



}
