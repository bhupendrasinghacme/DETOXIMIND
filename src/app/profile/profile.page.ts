import { Component, OnInit } from '@angular/core';
import { UserupdateService } from '../services/userupdate.service';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user_Data:any;
  edit_form:boolean = false;
  change_form:boolean = false;
  profile_view:boolean = true;
  constructor(
    private authService:AuthenticationService,
    private userupdateService:UserupdateService
    ) { }

  ngOnInit() {
    this.authService.getUserData().then(item=>{
      this.user_Data = JSON.parse(item.value);
      // console.log("hi this is user profile data--->",this.user_Data);
     this.userupdateService.getUserData(this.user_Data.id).subscribe(item=>{
console.log("user data new------>",item);
     });
    })
  }
  editForm(){
    this.change_form = false;
    this.profile_view = false;
    this.edit_form = true;
    
  }

changeForm(){
this.edit_form = false;
this.profile_view = false;
this.change_form = true;

  }
  chengePassword(){
    this.edit_form = false;
    this.profile_view = true;
    this.change_form = false;
    
      }

UpadateUser(){
  this.edit_form = false;
  this.profile_view = true;
  this.change_form = false;
  
}

}
