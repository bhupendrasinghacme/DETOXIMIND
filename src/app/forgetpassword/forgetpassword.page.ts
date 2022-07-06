import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ForgetService } from '../services/forget.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../helper/must-match.validator';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {
  sendEmail: boolean = true;
  email: any = '';
  token: any;
  credentials: FormGroup;
  credentialsEmail: FormGroup;
  constructor(
    private forgetApi: ForgetService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.credentialsEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
    this.credentials = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      restCode: ['', [Validators.required, Validators.minLength(4)]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
    this.authService.getAdminToken().subscribe(item => {
      this.token = item['data']['token'];
    })
  }
  async sendEmailVerification() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner: 'lines-sharp'
    });
    await loading.present();

    this.email = this.credentialsEmail.value.email;
    this.forgetApi.sendEmailCode({ email: this.credentialsEmail.value.email }, this.token).subscribe(async item => {
      this.presentToast(item['message'])
      this.sendEmail = false;
      await loading.dismiss();
      console.log(item);
    }, async error => {
      await loading.dismiss();
      if (error.error.message) {
        this.presentToast(error.error.message)
      }
    })
  }
  async forgetPassword() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner: 'lines-sharp'
    });
    await loading.present();
    let data = { email: this.email, password: this.credentials.value.password, code: this.credentials.value.restCode }
    this.forgetApi.forgetPasswordCode(data, this.token).subscribe(async item => {
      this.presentToast(item['message'])
      await loading.dismiss();
      this.sendEmail = true;
      this.router.navigate(['/login']);
    }, async error => {
      await loading.dismiss();
      if (error.error.message) {
        this.presentToast(error.error.message);
      }
    })
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

}
