import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';

@Component({
  selector: 'register-page',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {
  headerImageUrl = '../../assets/imgs/car-login.png';
  headerTitle = 'ثبت نام';

  registerForm: FormGroup;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ]
    });
  }

  formErrorCheck() {
    const message = this.registerForm.get('mobileNumber').hasError('required')
      ? 'شماره همراه الزامی است'
      : this.registerForm.get('mobileNumber').hasError('minlength')
      ? 'شماره همراه نامعتبر است'
      : this.registerForm.get('mobileNumber').hasError('maxlength')
      ? 'شماره همراه نامعتبر است'
      : 'خطا';
    return message;
  }

  navToLoginPage() {
    this.navCtrl.push(LoginPage);
  }
}
