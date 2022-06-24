import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.page.html',
  styleUrls: ['./signuppage.page.scss'],
})

export class SignuppagePage implements OnInit {
  credentials: FormGroup;
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGV0b3hpbWluZGRldi53cGVuZ2luZS5jb20iLCJpYXQiOjE2NTQxNzIxNDEsIm5iZiI6MTY1NDE3MjE0MSwiZXhwIjoxNjU0Nzc2OTQxLCJkYXRhIjp7InVzZXIiOnsiaWQiOjEsImRldmljZSI6IiIsInBhc3MiOiI2MDRlNGJlZDc3YjRjZTEyMjRjZWZiMjZkMTI3YmI5ZCJ9fX0.yDAWgIytIjJ-QMnZAFI_nEw6P5zjd2mn-cf9DjfVucM' 
    })
  };
  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    public httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required]]
    });
  }

  async signup(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner:'lines-sharp'
    });
    await loading.present();
  this.httpClient.post("https://detoximinddev.wpengine.com/wp-json/wp/v2/users", JSON.stringify(this.credentials.value), this.httpOptions).subscribe(async item=>{
    //  console.log(item);
    await loading.dismiss();
          this.presentDataAlert("User Resistered Successfully.");
      })     
  }
  async presentDataAlert(errorMessage){
    const alert = await this.alertController.create({
      header: 'Sign Up ',
      message: errorMessage,
      buttons: ['OK'],
    });
    await alert.present();
  }

  get email() {
    return this.credentials.get('email');
  }
  
  get username() {
    return this.credentials.get('username');
  }

  get password() {
    return this.credentials.get('password');
  }

}
