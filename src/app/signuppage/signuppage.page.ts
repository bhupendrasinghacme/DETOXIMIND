import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LmRldG94aW1pbmQuY29tIiwiaWF0IjoxNjU2NTk1ODAxLCJuYmYiOjE2NTY1OTU4MDEsImV4cCI6MTY1NzIwMDYwMSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjo0LCJkZXZpY2UiOiIiLCJwYXNzIjoiZTE4ZTA4NDE4MjVkYjkwNmJjMDEzMmM5YzBlZDEzMWQifX19.-uQAiXFTPGDrCeeajKhZB52kPR3RyM9J5a6qVBfbkhI'
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

  async signup() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner: 'lines-sharp'
    });
    await loading.present();
    this.httpClient.post(environment.wordpress.api_url + "users", JSON.stringify(this.credentials.value), this.httpOptions).subscribe(async item => {
      //  console.log(item);
      await loading.dismiss();
      this.presentDataAlert("User Resistered Successfully.");
    })
  }
  async presentDataAlert(errorMessage) {
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
