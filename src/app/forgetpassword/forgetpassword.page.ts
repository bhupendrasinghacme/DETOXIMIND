import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ForgetService } from '../services/forget.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../helper/must-match.validator';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
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
  constructor(
    private forgetApi: ForgetService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public router: Router
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      restCode: ['', [Validators.required]]
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
    this.forgetApi.sendEmailCode({ email: this.email }, this.token).subscribe(async item => {
      console.log(item);
      this.sendEmail = false;
      await loading.dismiss();
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
      console.log(item);
      await loading.dismiss();
      this.router.navigate(['/login']);
    })
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
