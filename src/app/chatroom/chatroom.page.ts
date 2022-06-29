import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
export class ChatroomPage implements OnInit {
  message = '';
  currentUser = 'bhupendra';
  messages = [{user:'deepak',msg:"Hi i'm deepak ",createdAt:'29/06/2022'}];
  constructor(
    private toast: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }
  sendMessage() {
    this.messages.push({user:'bhupendra',msg:this.message,createdAt:'29/06/2022'});
    this.message = '';
  }


}
