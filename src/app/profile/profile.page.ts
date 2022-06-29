import { Component, OnInit } from '@angular/core';
import { UserupdateService } from '../services/userupdate.service';
import { AuthenticationService } from './../services/authentication.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  updateForm: FormGroup;
  changeData: FormGroup;
  user_Data: any;
  edit_form: boolean = false;
  change_form: boolean = false;
  profile_view: boolean = true;
  username:string;
  email:string;
  firstname:string;
  lastname:string;
  old_password:string;
  new_password:string;
  confirmPassword:string;
  constructor(
    private authService: AuthenticationService,
    private userupdateService: UserupdateService,
    public toastController: ToastController,
    public loadingController:LoadingController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      first_name: [''],
      last_name: ['']
    });
    this.authService.getUserData().then(item => {
      this.user_Data = JSON.parse(item.value);
      this.userupdateService.getUserData(this.user_Data.id).subscribe(item => {
        // console.log("user data new------>",item);
      });
    })
  }
  editForm() {
    this.change_form = false;
    this.profile_view = false;
    this.edit_form = true;

  }

  changeForm() {
    this.edit_form = false;
    this.profile_view = false;
    this.change_form = true;

  }
  async chengePassword() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner:'lines-sharp'
    });
    await loading.present();
    let userData = {password:this.new_password};
    this.userupdateService.updateUserProfile(this.user_Data.id,userData).subscribe(async item=>{
      console.log("item=====>",item);
      await loading.dismiss();
      this.presentToast("Change User password Successfully.");
      this.closeEditor();
    })
  }

  async UpadateUser() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner:'lines-sharp'
    });
    await loading.present();
    this.userupdateService.updateUserProfile(this.user_Data.id,this.updateForm.value).subscribe(async item=>{
      console.log("item=====>",item);
      await loading.dismiss();
      this.presentToast("User Successfully Updated.");
      this.closeEditor();
    })
  }

  closeEditor() {
    this.edit_form = false;
    this.profile_view = true;
    this.change_form = false;
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }

}
