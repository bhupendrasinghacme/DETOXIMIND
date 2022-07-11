import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { EmailComposerOptions } from '@awesome-cordova-plugins/email-composer';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx'

@Component({
  selector: 'app-formstory',
  templateUrl: './formstory.component.html',
  styleUrls: ['./formstory.component.scss'],
})
export class FormstoryComponent implements OnInit {
  ionicForm: FormGroup;
  isSubmitted: boolean = false;
  isChecked1: boolean = false;
  isChecked2: boolean = false;
  constructor(
    private emailComposer: EmailComposer,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      school: [''],
      country: [''],
      publish_name: [''],
      go_anonymou: ['']

    })
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      this.openEmail();
      return false;
    } else {
      console.log(this.ionicForm.value)
    }
  }

  async openEmail() {
    const email: EmailComposerOptions = {
      to: 'bhupendra.221singh@gmail.com',
      subject: 'fist send email',
      body: 'he i am bhupendra'
    }
    await this.emailComposer.open(email);
  }

}
