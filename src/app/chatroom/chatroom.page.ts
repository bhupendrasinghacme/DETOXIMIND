import { Component, OnInit,ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IonContent } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthenticationService } from './../services/authentication.service';
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})

export class ChatroomPage  implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  message = '';
  currentUser = 'bhupendra';
  messages:any;
selected = [];
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
    let data = {user:this.currentUser,msg:this.message,createdAt:myDateTemp};
    this.itemDoc.add(data).then(itm=>{
      // this.getMessage();
      this.message = '';
      this.content.scrollToBottom();
    })
    
  }
getMessage(){
  this.item = this.itemDoc.valueChanges();
  this.item.subscribe(item=>{
    this.messages = item;
  })
}

// getChatMessages() {
//   let users = [];
//   return this.getUsers().pipe(
//     switchMap(res => {
//       users = res;
//       return this.afs.collection('messages', ref => ref.orderBy('createdAt')).valueChanges({ idField: 'id' }) as Observable<Message[]>;
//     }),
//     map(messages => {
//       // Get the real name for each user
//       for (let m of messages) {          
//         m.fromName = this.getUserForMsg(m.from, users);
//         m.myMsg = this.currentUser.uid === m.from;
//       }        
//       return messages
//     })
//   )
// }


}
