import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  ionicForm: FormGroup;
  email: String;
  adminToken: any;
  questionMsg: any;
  loader: any = false;
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authenticationService: AuthenticationService

  ) {
    this.authenticationService.getUserData().then(item => {
      this.email = JSON.parse(item['value']).email;
    })

    this.authenticationService.getAdminToken().subscribe(item => {
      this.adminToken = item['data']['token'];
    })
    this.ionicForm = this.fb.group({
      questionInput: ['', [Validators.required, Validators.minLength(10)]]
    });
    this.fetchAnswerData();
  }

  fetchAnswerData() {
    this.postService.askQuestionAnswer(this.adminToken).subscribe(item => {
      console.log(item);
    })
  }


  submitForm() {
    let data = { email: this.email, user_message: this.ionicForm.value.questionInput };
    this.loader = true;
    this.postService.askQuestion(data, this.adminToken).subscribe(item => {
      this.questionMsg = '';
      this.loader = false;
      console.log(item)
    })
  }
}
