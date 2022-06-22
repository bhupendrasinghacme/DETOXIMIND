import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user_Data:any;
  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
    this.authService.getUserData().then(item=>{
      this.user_Data = JSON.parse(item.value);
      console.log("hi this is user profile data--->",this.user_Data.email);
    })
  }

}
