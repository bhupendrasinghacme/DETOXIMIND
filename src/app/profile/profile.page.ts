import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserupdateService } from '../services/userupdate.service';
import { AuthenticationService } from './../services/authentication.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../helper/must-match.validator';
import { Platform, ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  images: any;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  updateForm: FormGroup;
  changeData: FormGroup;
  user_Data: any;
  edit_form: boolean = false;
  change_form: boolean = false;
  profile_view: boolean = true;
  // username: string;
  email: string;
  firstname: string;
  lastname: string;
  imageData: any;
  adminToke: any;
  imageUrl: any = '../../assets/profile..png';
  // old_password: string;
  // new_password: string;
  // confirmPassword: string;
  constructor(
    private authService: AuthenticationService,
    private userupdateService: UserupdateService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private fb: FormBuilder,
    private plt: Platform,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      first_name: [''],
      last_name: ['']
    });

    this.changeData = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: MustMatch('new_password', 'confirm_password')
    }
    );
    this.authService.getUserData().then(item => {
      this.user_Data = JSON.parse(item.value);
      // console.log(item.value)
      // this.userupdateService.getUserData(this.user_Data.id).subscribe(item => {
      this.email = this.user_Data.email;
      this.firstname = this.user_Data.firstName;
      this.lastname = this.user_Data.lastName;
      // });
    })


    // this.authService.getAdminToken().subscribe(item => {
    //   this.adminToke = item['data']['token'];
    // })
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
      spinner: 'lines-sharp'
    });
    await loading.present();
    let userData = { password: this.changeData.value.new_password };
    console.log(this.changeData.value.old_password);
    this.userupdateService.updateUserProfile(this.user_Data.id, userData).subscribe(async item => {
      console.log("item=====>", item);
      await loading.dismiss();
      this.changeData.reset();
      this.presentToast("Change User password Successfully.");
      this.closeEditor();
    })
  }

  async UpadateUser() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner: 'lines-sharp'
    });
    await loading.present();
    this.userupdateService.updateUserProfile(this.user_Data.id, this.updateForm.value).subscribe(async item => {
      console.log("item=====>", item);
      await loading.dismiss();
      this.presentToast("User Successfully Updated.");
      this.user_Data.email = item.email;
      this.user_Data.firstName = item.first_name;
      this.user_Data.lastName = item.last_name;
      this.authService.updateUserData(this.user_Data);
      this.closeEditor();
    }, async error => {
      await loading.dismiss();
      console.log(error);
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


  get old_password() {
    return this.changeData.get('old_password');
  }
  get new_password() {
    return this.changeData.get('new_password');
  }
  get confirm_password() {
    return this.changeData.get('confirm_password');
  }


  async selectImageSource() {
    const buttons = [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: 'Choose From Photos Photo',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      }
    ];

    // // Only allow file selection inside a browser
    // if (!this.plt.is('hybrid')) {
    //   buttons.push({
    //     text: 'Choose a File',
    //     icon: 'attach',
    //     handler: () => {
    //       this.fileInput.nativeElement.click();
    //     }
    //   });
    // }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons
    });
    await actionSheet.present();
  }
  async addImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source
    });

    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);

    let date = new Date();
    const imageName = 'Give me a name';
    // this.imageUrl = urlCreator.createObjectURL(blobData);

    this.imageUrl = window.URL.createObjectURL(blobData);


    // this.userupdateService.uploadMedia({ img_src: blobData, imageName: date.getTime(), format: image.format }, this.adminToke).subscribe((newImage) => {
    // this.images.push(newImage);
    console.log(image);
    // });
  }

  // uploadFile(event: EventTarget) {
  // const eventObj: MSInputMethodContext = event as MSInputMethodContext;
  // const target: HTMLInputElement = eventObj.target as HTMLInputElement;
  // const file: File = target.files[0];
  // this.api.uploadImageFile(file).subscribe((newImage: ApiImage) => {
  //   this.images.push(newImage);
  // });
  // }
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}
