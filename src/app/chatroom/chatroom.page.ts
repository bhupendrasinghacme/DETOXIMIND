import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})

export class ChatroomPage  implements OnInit {
  message = '';
  currentUser = 'bhupendra';
  messages:any;
  private itemDoc: AngularFirestoreCollection<any>;
  item:Observable<any[]>;
  user_Data:any;
  constructor(
    private toast: ToastController,
    private db: AngularFirestore,
    private authService: AuthenticationService,
  ) { 
  }

  ngOnInit() {
    this.itemDoc = this.db.collection<any>('messages');
    this.authService.getUserData().then(item => {
      this.user_Data = JSON.parse(item.value);
      this.currentUser = this.user_Data.displayName;
    })
    this.getMessage();


  }
  sendMessage() {
    let data = {user:this.currentUser,msg:this.message,createdAt:'29/06/2022'};
    this.itemDoc.add(data).then(itm=>{
      this.getMessage();
      this.message = '';
    })
    
  }
getMessage(){
  this.item = this.itemDoc.valueChanges();
  this.item.subscribe(item=>{
    this.messages = item;
  })
}
}
