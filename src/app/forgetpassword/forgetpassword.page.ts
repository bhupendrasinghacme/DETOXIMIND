import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ForgetService } from '../services/forget.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {
  sendEmail: boolean = true;
  email1: any = '';
  token: any;
  constructor(
    private forgetApi: ForgetService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authService.getAdminToken().subscribe(item => {
      this.token = item['data']['token'];
    })
  }
  sendEmailVerification() {
    this.forgetApi.sendEmailCode({ email: this.email1 }, this.token).subscribe(item => {
      console.log(item);
      this.sendEmail = false;
    })
  }

}
